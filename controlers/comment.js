const Product = require('../models/product');
const User = require('../models/user');
const Comment = require('../models/comment');
exports.addPost = async (req, res, next) => {
 const idUser = req.session.userId;
 const idProduct = req.params['id'];
 const numberStar = parseInt(req.body.rating);
 if (idUser) {
  const currentdate = new Date();
  const datetime = currentdate.getDate() + "/"
   + (currentdate.getMonth() + 1) + "/"
   + currentdate.getFullYear() + " @ "
   + currentdate.getHours() + ":"
   + currentdate.getMinutes() + ":"
   + currentdate.getSeconds();
  const user = await User.findOne({ _id: idUser })
  const comment = new Comment({
   idProduct: idProduct,
   email: user.email,
   ho: user.ho,
   ten: user.ten,
   content: req.body.nhanXet,
   numberStar: numberStar,

  });
  comment.save((error, com) => {
   if (error) {
    res.status(400).json({ error: error })
   }
   if (com) {
    console.log('bạn đã comment thành công!');
    console.log(datetime);
   }
  });
  const path = "/khoahoc/info/" + idProduct;
  res.redirect(path);
 }
}