const Product = require('../models/product');
const User = require('../models/user');
const Cart = require('../models/cart');
const Order = require('../models/order');
exports.addCart = async (req, res, next) => {
 const id = req.session.userId;
 const productId = req.params['id'];
 if (id) {
  const user = await User.findOne({ _id: id });
  const _cart = new Cart({
   email: user.email,
   productId: productId,
   quantity: 1,
   check: 0
  })
  _cart.save((error, cart) => {
   if (error) {
    res.status(400).json({ error: error })
   }
   if (cart) {
    console.log('đã thêm vào giỏ hàng thành công');
    res.redirect('/cart/list');
   }
  })
 } else {
  res.redirect('/');
 }
}
exports.list = async (req, res, next) => {
 const idUser = req.session.userId;
 let data = [];
 if (idUser) {
  const user = await User.findOne({ _id: idUser });
  const dataCart = await (await Cart.find({ email: user.email }));
  const numberProduct = dataCart.length;
  if (numberProduct) {
   for (var i = 0; i < numberProduct; i++) {
    const product = await Product.findOne({ _id: dataCart[i].productId });
    data.push(product);
   }
   res.render('cart/list', { data: data, user: user, numberProduct: numberProduct });
  } else {
   res.render('cart/list', { data: data, user: user, numberProduct: numberProduct });
  }
  // const product=await Product.findOne({_id:dataCart.productId});
  // res.render('cart/list',{carts:dataCart,data:product})
 }
}
exports.Delete = async (req, res, next) => {
 const idProduct = req.params['id'];
 await Cart.deleteOne({ productId: idProduct });
 res.redirect('../list');
}
exports.checkout = async (req, res, next) => {
 const idUser = req.session.userId;
 let data = [];
 var tong = 0;
 if (idUser) {
  const user = await User.findOne({ _id: idUser });
  const dataCart = await Cart.find({ email: user.email });
  const numberProduct = dataCart.length;
  for (var i = 0; i < numberProduct; i++) {
   const product = await Product.findOne({ _id: dataCart[i].productId });
   tong = tong + (product.gia);
   data.push(product);
  }
  console.log(numberProduct);
  res.render('cart/checkout', { data: data, user: user, numberProduct: numberProduct, tong: tong });

 }
}
exports.Orders = async (req, res, next) => {
 // var data = [];
 // const idUser = req.session.userId;
 // const USER = await User.findOne({ _id: idUser });
 // ORDER = await Order.find({ email: USER.email })
 // data = ORDER;
 // for (var i = 0; i < ORDER.length; i++) {
 //  var total = 0;
 //  var LISTPRODUCT = [];
 //  for (var j = 0; j < ORDER[i].listIdProduct.length; j++) {
 //   const PRODUCT = await Product.findOne({ _id: ORDER[i].listIdProduct[j] })
 //   LISTPRODUCT.push(PRODUCT);
 //   total = total + PRODUCT.gia;

 //  }
 //  data[i].listIdProduct = LISTPRODUCT;
 //  data[i].total = total;
 // }
 // console.log(data);
 const idUser = req.session.userId;
 const user = await User.findOne({ _id: idUser });
 const orderList = await Order.find({ email: user.email });
 var count = orderList.length;
 var dataOrder = [];
 if (count) {
  dataOrder = orderList;
  for (var i = 0; i < count; i++) {
   var tmpdataOrder = [];
   var tong = 0;
   for (var j = 0; j < orderList[i].listIdProduct.length; j++) {
    const product = await Product.findOne({ _id: orderList[i].listIdProduct[j] });
    tmpdataOrder.push(product);
    tong = tong + product.gia;

   }
   dataOrder[i].listIdProduct = tmpdataOrder;
   dataOrder[i].tong = tong;

  }


 }
 res.render('cart/order', { data: dataOrder, user: user });
}
exports.checkoutPost = async (req, res, next) => {
 const idUser = req.session.userId;
 const arrProductId = [];
 const user = await User.findOne({ _id: idUser });
 console.log(req.body);
 const cartList = await Cart.find({ email: user.email });
 const count = cartList.length;
 for (var i = 0; i < count; i++) {
  arrProductId.push(cartList[i].productId);
 }
 const currentdate = new Date(); //Lấy ngày giờ mua hàng
 const datetime = currentdate.getDate() + "/"
  + (currentdate.getMonth() + 1) + "/"
  + currentdate.getFullYear() + " @ "
  + currentdate.getHours() + ":"
  + currentdate.getMinutes() + ":"
  + currentdate.getSeconds();
 const dataOrder = new Order({
  email: user.email,
  nguoiNhan: req.body.ten,
  sdtNguoiNhan: req.body.sdt,
  diaChiNhan: req.body.diaChi,
  listIdProduct: arrProductId,

  trangthai: false
 });
 dataOrder.save((error, order) => {
  if (error) {
   res.status(400).json({ error: error })
  }
  if (order) {
   console.log('đã thêm vào order thành công');
  }
 });
 await Cart.deleteMany({ email: user.email });
 res.redirect('/cart/orders');


}

exports.editAddress = async (req, res, next) => {
 const idUser = req.session.userId;
 const user = await User.findOne({ _id: idUser });
 const idOrder = req.params['id'];
 const order = await Order.findOne({ _id: idOrder });
 res.render('cart/editAddress', { data: order, user: user });
}
exports.editAddressPost = async (req, res, next) => {
 const idUser = req.session.userId;
 const user = await User.findOne({ _id: idUser });
 const idOrder = req.params['id'];
 const data = {
  nguoiNhan: req.body.nguoiNhan,
  sdtNguoiNhan: req.body.sdtNguoiNhan,
  diaChiNhan: req.body.diaChiNhan
 }
 await Order.updateOne({ _id: idOrder }, { $set: data });
 res.redirect('../orders');
}
exports.deleteOrders = async (req, res, next) => {
 const idOrder = req.params['id'];
 await Order.deleteOne({ _id: idOrder });
 res.redirect('../orders');
}