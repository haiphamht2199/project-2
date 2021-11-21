const Product = require('../models/product');
const User = require('../models/user');
const Comment = require('../models/comment');
exports.categoryProduct = async (req, res, next) => {
 const loai = req.params['loai'];
 const id = req.session.userId;

 if (loai === "all") {
  const data = await Product.find();
  const title = "Tất cả";
  if (id) {
   const user = await User.findOne({ _id: id });
   res.render('product/list', { data: data, title: title, user: user })
  } else {
   res.render('product/list', { data: data, title: title, user: { _id: null } });

  }

 }
 if (loai === "lop3") {
  const data = await Product.find({ loai: loai });
  const title = "Lớp 3";
  if (id) {
   const user = await User.findOne({ _id: id });
   res.render('product/list', { data: data, title: title, user: user })
  } else {
   res.render('product/list', { data: data, title: title, user: { _id: null } })
  }

 }
 if (loai === "lop4") {
  const data = await Product.find({ loai: loai });
  const title = "lớp 4";
  if (id) {
   const user = await User.findOne({ _id: id });
   res.render('product/list', { data: data, title: title, user: user })
  } else {
   res.render('product/list', { data: data, title: title, user: { _id: null } })
  }

 }
 if (loai === "lop5") {
  const data = await Product.find({ loai: loai });
  const title = "lớp 5";
  if (id) {
   const user = await User.findOne({ _id: id });
   res.render('product/list', { data: data, title: title, user: user })
  } else {
   res.render('product/list', { data: data, title: title, user: { _id: null } })
  }

 }

}
exports.info = async (req, res, next) => {
 const id = req.params['id'];
 const loai = req.params['loai'];
 const _id = req.session.userId;
 let data = await Product.findOne({ _id: id });
 const data1 = await Product.find({ loai: data.loai });
 const comments = await Comment.find({ idProduct: id });
 const numberComment = await Comment.find({ idProduct: id }).count();
 const numberSta5 = await Comment.find({ idProduct: id, numberStar: 5 }).count();
 const numberSta4 = await Comment.find({ idProduct: id, numberStar: 4 }).count();
 const numberSta3 = await Comment.find({ idProduct: id, numberStar: 3 }).count();
 const numberSta2 = await Comment.find({ idProduct: id, numberStar: 2 }).count();
 const numberSta1 = await Comment.find({ idProduct: id, numberStar: 1 }).count();

 var SumStar = 0;
 var TbStar = 0;
 if (numberComment == 0) {
  TbStar = 0;
 } else {
  for (var i = 0; i < numberComment; i++) {
   SumStar += comments[i].numberStar;
  }
  TbStar = SumStar / numberComment;
 }

 const mota = data.mota;
 if (_id) {

  const user = await User.findOne({ _id: _id });
  res.render('product/info', { data: data, mota, data1: data1, user: user, title: loai, comments: comments, numberComment: numberComment, TbStar: TbStar, star: { numberSta5: numberSta5, numberSta4: numberSta4, numberSta3: numberSta3, numberSta2: numberSta2, numberSta1: numberSta1 } });
 } else {
  res.render('product/info', { data: data, mota, data1: data1, user: { _id: null }, title: loai, comments: comments, numberComment: numberComment, TbStar: TbStar, star: { numberSta5: numberSta5, numberSta4: numberSta4, numberSta3: numberSta3, numberSta2: numberSta2, numberSta1: numberSta1 } });
 }

}
exports.searchPost = async (req, res, next) => {
 const id = req.session.userId;
 const key = req.body.key;
 const products = await Product.find();
 const datas = [];
 const datat = [];
 const data = [];
 const datae = [];
 for (var i = 0; i < products.length; i++) {
  datas.push(products[i].ten);
 }
 datas.filter(data => {
  if (data.indexOf(key) !== -1) {
   datat.push(data);
  }
 });
 for (var i = 0; i < datat.length; i++) {
  const product = await Product.find({ ten: datat[i] });
  data.push(product);
 }
 for (var i = 0; i < data.length; i++) {
  datae.push(data[i][0]);
 }
 if (id) {
  const user = await User.findOne({ _id: id });
  res.render('product/list', { data: datae, user: user, title: 'tất cả' })
 } else {
  res.render('product/list', { data: datae, user: { _id: null }, title: 'tất cả' })
 }
}