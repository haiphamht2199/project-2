const { signUpServices } = require("../service/user");
const User = require('../models/user');
const bcrypt = require('bcrypt')
exports.signUp = (req, res, next) => {
 res.render('user/signup', { dataError: null, user: { _id: null } });
}
exports.signUpPost = async (req, res, next) => {
 console.log(req.session);
 const user = req.body;
 if (user.password !== user.rePassword) {
  res.render('user/signup', { dataError: 'mật khẩu không trùng nhau!', user: { _id: null } })
 } else {
  const data = await signUpServices(user);
  console.log(data.message);
  if (data.errCode === 1) {
   res.render('user/signup', { dataError: data.message, user: { _id: null } });
  }
  if (data.errCode === 0) {
   res.redirect('login');
  }
 }
}
exports.signIn = (req, res, next) => {
 res.render('user/signin', { dataError: null, user: { _id: null } });
}
exports.loginPost = async (req, res, next) => {
 const email = req.body.email;
 let user = await User.findOne({ email: email });
 if (user) {
  if (bcrypt.compareSync(req.body.password, user.hash_password)) {
   req.session.userId = user._id;

   res.redirect('/')
  } else {
   res.render('user/signin', { dataError: 'Password không đúng!', user: { _id: null } })
  }
 } else {
  res.render('user/signin', { dataError: 'Email không tồn tại!', user: { _id: null } })
 }
}
exports.logout = (req, res, next) => {
 req.session.destroy(() => {
  res.redirect('/');
 })
}
exports.info = async (req, res, next) => {
 const id = req.session.userId;
 const user = await User.findOne({ _id: id });
 res.render('user/info', { user: user })
}
exports.edit = async (req, res, next) => {
 const id = req.session.userId;
 const user = await User.findOne({ _id: id });
 res.render('user/edit', { user: user })
}
exports.editPost = async (req, res, next) => {
 const id = req.session.userId;

 const data = {
  ho: req.body.ho,
  ten: req.body.ten,
  diachi: req.body.diaChi,
  sdt: req.body.sdt,
 }


 await User.updateOne({ _id: id }, { $set: data });

 res.redirect('info');
}
exports.support = async (req, res, next) => {
 const id = req.session.userId;
 const user = await User.findOne({ _id: id });
 res.render('user/support', { user: user })
}