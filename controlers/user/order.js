const Order = require('../../models/order');
const Cart = require('../../models/Cart');
const Product = require('../../models/product');
exports.addOrder = async (req, res, next) => {
  const cart = await Cart.find({ user: req.user._id }).select("_id user cartItems.product cartItems.name cartItems.imageProduct cartItems.quantity cartItems.price").populate({ path: "cartItems.product", select: "_id name" });

  var total = 0;
  const cartItems = cart[0].cartItems;
  const _cartItems = cart[0].cartItems;
  for (var i = 0; i < cartItems.length; i++) {
    total += cartItems[i].quantity * cartItems[i].price;
  }
  for (var i = 0; i < _cartItems.length; i++) {
    const id = _cartItems[i].product._id;
    const product = await Product.findOne({ _id: id });
    var stock = product.stock;
    var daBan = product.daBan
    if (product) {
      product.daBan = daBan + _cartItems[i].quantity;
      product.stock = stock - _cartItems[i].quantity
    }
    const newProduct = await product.save();
  }

  Cart.deleteOne({ user: req.user._id }).exec((error, result) => {
    if (error) {
      return res.status(400).json({ error })
    };
    if (result) {
      req.body.user = req.user._id;
      req.body.orderStatus = [
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
      const order = new Order({
        user: req.body.user,
        totalAmount: total,
        adress: req.body.adress,
        phoneNumber: req.body.phoneNumber,
        paymentType: req.body.paymentType,
        orderStatus: req.body.orderStatus,
        items: cartItems
      });
      order.save((error, order) => {
        if (error) return res.status(400).json({ error });
        if (order) {
          res.status(201).json({ order });
        }
      });

    }

  })
}
exports.BuyItNow = async (req, res, next) => {
  const product = await Product.findOne({ _id: req.body.item._id });
  var stock = product.stock;
  var daBan = product.daBan
  if (product) {
    product.daBan = daBan + parseInt(req.body.item.quantity);
    product.stock = stock - parseInt(req.body.item.quantity);
    const newProduct = await product.save();
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
    let paymentMethod = req.body.paymentMethod == "1" ? "Thanh toán trực tiếp" : "Thanh toán trực tuyến"
    let total = 0;
    let items = [];
    let item = {};
    item.product = product._id;
    item.name = product.name;
    item.imageProduct = product.imageProduct;
    item.quantity = parseInt(req.body.item.quantity);
    if (req.body.item.price == product.price) {
      item.price = product.price;
      total = product.price * parseInt(req.body.item.quantity);
    } else {
      item.price = req.body.item.price;
      total = req.body.item.price * parseInt(req.body.item.quantity);
    }
    items.push(item)
    const order = new Order({
      user: req.body.user._id,
      totalAmount: total,
      adress: req.body.user.address,
      phoneNumber: req.body.user.phone,
      paymentType: paymentMethod,
      orderStatus: orderStatus,
      items: items
    });
    order.save((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        res.status(201).json({ order });
      }
    });
  }
}