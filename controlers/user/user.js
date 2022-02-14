const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
exports.signUp = async (req, res, next) => {
 User.findOne({ email: req.body.email }).exec((error, user) => {
  if (user) {
   return res.status(400).json({
    message: "user already registered!"
   })
  }
 });
 const { firstName, lastName, password, email,address,contactNumber} = req.body;

 let role = "user";
 const hash_password = await bcrypt.hash(password, 10);
 const _user = new User({
  firstName: firstName,
  lastName: lastName,
  email: email,
  hash_password: hash_password,
  role: role,
  contactNumber:contactNumber,
  address:address,
  userName: shortid.generate()
 });
 _user.save((error, data) => {
  if (error) {
   return res.status(400).json({
    message: "Something went wrong!"
   });
  }
  if (data) {
   return res.status(201).json({
    message: "user created Successfully!"
   });
  }
 });
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