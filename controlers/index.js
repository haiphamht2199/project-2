const Product = require('../models/product');
const User = require('../models/user');
exports.index = async (req, res, next) => {
 const data = await Product.find();
 const id = req.session.userId;
 if (id === undefined) {

  res.render('index', { data: data, user: { _id: null } });
 } else {

  const user = await User.findOne({ _id: id });
  res.render('index', { data: data, user: user });
 }

}