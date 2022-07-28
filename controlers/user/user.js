const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const Product = require('../../models/product');
const Order = require('../../models/order');
exports.signUp = async (req, res, next) => {
  // User.findOne({ email: req.body.email }).exec((error, user) => {
  //  if (user) {
  //   return res.status(400).json({
  //    message: "user already registered!"
  //   })
  //  }
  // });
  // const { firstName, lastName, password, email,address,contactNumber} = req.body;

  // let role = "user";
  // const hash_password = await bcrypt.hash(password, 10);
  // const _user = new User({
  //  firstName: firstName,
  //  lastName: lastName,
  //  email: email,
  //  hash_password: hash_password,
  //  role: role,
  //  contactNumber:contactNumber,
  //  address:address,
  //  userName: shortid.generate()
  // });
  // _user.save((error, data) => {
  //  if (error) {
  //   return res.status(400).json({
  //    message: "Something went wrong!"
  //   });
  //  }
  //  if (data) {
  //   return res.status(201).json({
  //    message: "user created Successfully!"
  //   });
  //  }
  // });
  let role = "user";
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user) {
      return res.status(202).json({
        message: 'User already regisrered'
      });
    }
    const {
      firstName,
      lastName,
      email,
      password,
      userName
    } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      userName: userName,
      hash_password: hash_password,
      role: role,
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(202).json({
          message: "Something went wrong"
        })
      }
      if (data) {
        return res.status(200).json({
          message: 'User created Successful'
        })
      }
    })
  })
}
exports.signin = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({ error: error });
    }
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.hash_password) && user.role == "user") {
        const token = jwt.sign({
          _id: user._id, role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '100d' });
        const { _id, firstName, lastName, email, role } = user;
        res.cookie("token", token, { expiresIn: "100d" })
        let daucach = " ";
        const fullName = firstName + daucach + lastName;
        res.status(201).json({
          token,
          user: { _id, firstName, lastName, email, role }
        })
      } else {
        return res.status(400).json({
          message: "mat khau cua ban khong dung!"
        })
      }
    } else {
      return res.status(400).json({
        message: "email cua ban khong dung!"
      })
    }
  })
}
exports.AddComment = async (req, res, next) => {
  try {
    let productId = req.body.productId;
    function addLeadingZeros(n) {
      if (n <= 9) {
        return "0" + n;
      }
      return n
    }
    let currentDatetime = new Date()
    let formattedDate = addLeadingZeros(currentDatetime.getDate()) + "-" + addLeadingZeros(currentDatetime.getMonth() + 1) + "-" + currentDatetime.getFullYear() + " " + addLeadingZeros(currentDatetime.getHours()) + ":" + addLeadingZeros(currentDatetime.getMinutes()) + ":" + addLeadingZeros(currentDatetime.getSeconds())
    if (productId) {
      let product = await Product.findOne({ _id: productId });
      if (product) {
        let _reviews = product.reviews;
        let newReview = {};
        newReview.userid = req.body.idUser;
        newReview.comment = req.body.comment;
        newReview.rating = req.body.rating;
        newReview.time = formattedDate;
        _reviews.push(newReview);
        const updateProduct = await Product.findOneAndUpdate({ _id: productId }, {
          reviews: _reviews
        }, {
          new: true,
        });
        return res.status(200).json(updateProduct);
      }
    }
  } catch (error) {

  }
}
exports.getOrders = async (req, res, next) => {
  try {
    let id = req.body.id;
    if (id) {
      let orders = await Order.find({ user: id });
      if (orders) {
        return res.status(200).json(orders);
      } else {
        return res.status(201).json([]);
      }
    }
  } catch (e) {

  }
}
exports.getOrder = async (req, res, next) => {
  try {
    let id = req.body.id;
    if (id) {
      let order = await Order.find({ _id: id }).populate({ path: "user", select: "firstName lastName" }).exec();;
      if (order) {
        return res.status(200).json(order);
      } else {
        return res.status(201).json([]);
      }
    }
  } catch (e) {

  }
}
exports.checkout = async (req, res, next) => {
  try {
    let _items = req.body.items;
    let rule = req.body.rule;
    let user = req.body.user;
    let total = 0;
    let items = [];
    _items.map((i) => {
      let item = {};

      item.product = i._id;
      item.name = i.name;
      item.imageProduct = i.imageProduct;
      item.quantity = parseInt(i.qty);
      if (rule.status) {

        if ((rule.productType === "0" || (rule.productType === "1" && rule.selecProduct.indexOf(i._id) !== -1))) {

          item.price = i.price - (i.price * rule.value) / (100);

          total += (i.price - (i.price * rule.value) / (100)) * parseInt(i.qty);

        } else {
          item.price = i.price;
          total += i.price * parseInt(i.qty);
        }
      } else {
        item.price = i.price;
        total += i.price * parseInt(i.qty);
      }
      items.push(item);


    });
    if (items.length && total) {
      let orderStatus = [
        {
          type: "đặt hàng",
          date: new Date(),
          isCompleted: true
        },
        {
          type: "đang đóng hàng",
          isCompleted: false
        },
        {
          type: "đang vận chuyển",
          isCompleted: false
        },
        {
          type: "đã giao hàng",
          isCompleted: false
        },
      ];
      let paymentMethod = req.body.paymentMethod == "1" ? "Thanh toán trực tiếp" : "Thanh toán trực tuyến";
      const order = new Order({
        user: user._id,
        totalAmount: total,
        adress: user.address,
        phoneNumber: req.body.user.phone,
        paymentType: paymentMethod,
        orderStatus: orderStatus,
        items: items
      });
      order.save((error, order) => {
        if (error) return res.status(400).json({ error });
        if (order) {

          _items.map(async (i) => {
            const product = await Product.findOne({ _id: i._id });
            if (product) {
              product.daBan = product.daBan + parseInt(i.qty);
              product.stock = product.stock - parseInt(i.qty);
              const newProduct = await product.save();

            }
          });
          res.status(201).json({ order });
        }
      });
    }
  } catch (error) {

  }
}
exports.updateProfile = async (req, res, next) => {
  try {
    let user = req.body.user;
    if (user.id) {
      let newUser = await User.findOne({ _id: user.id });
      if (newUser) {
        if (user.password !== user.confirmPassword) {
          res.status(205).json("Password and Confirm Password Are Not Matched");
        }
        if (bcrypt.compareSync(user.password, newUser.hash_password) && newUser.role == "user") {

          if (user.newPassword) {
            console.log("haha666")
            const hash_password = await bcrypt.hash(user.newPassword, 10);
            const updateUser = await User.findOneAndUpdate({ _id: user.id }, {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              hash_password: hash_password,

            }, {
              new: true,
            });
            const token = jwt.sign({
              _id: updateUser._id, role: updateUser.role
            }, process.env.JWT_SECRET, { expiresIn: '100d' });
            console.log("haha666", updateUser)
            res.status(200).json({ updateUser: updateUser, token: token })
          } else {
            const _updateUser = await User.findOneAndUpdate({ _id: user.id }, {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            }, {
              new: true,
            });
            const _token = jwt.sign({
              _id: _updateUser._id, role: _updateUser.role
            }, process.env.JWT_SECRET, { expiresIn: '100d' });
            res.status(200).json({ updateUser: _updateUser, token: _token })
          }
        } else {
          console.log("haha")
          res.status(207).json("Password Fail!");
        }
      }
    }
  } catch (error) {

  }
}