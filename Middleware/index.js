const jwt = require('jsonwebtoken');

exports.RequestAdminSignin = (req, res, next) => {

 if (req.headers.authorization) {
  const token = req.headers.authorization.split(" ")[0];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  if (user.role == "admin") {
   req.user = user;
   next();
  } else {
   return res.status(400).json({
    message: "Authorization failse!"
   })
  }

 } else {
  return res.status(400).json({
   message: "Authorization required!"
  })

 }
}
exports.RequestUserSignin = (req, res, next) => {

 if (req.headers.authorization) {
  const token = req.headers.authorization.split(" ")[0];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  if (user.role == "user") {
   req.user = user;
   next();
  } else {
   return res.status(400).json({
    message: "Authorization failse!"
   })
  }

 } else {
  return res.status(400).json({
   message: "Authorization required!"
  })

 }
}