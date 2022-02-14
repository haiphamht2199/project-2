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