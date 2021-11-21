const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt')
exports.signUpServices = async (data) => {
 return new Promise(async (resolve, reject) => {
  try {
   await User.findOne({ email: data.email }).exec((err, user) => {
    if (user) {
     resolve({
      errCode: 1,
      message: 'email da ton tai'
     })
    } else {
     const _user = new User({
      ho: data.ho,
      ten: data.ten,
      tp: data.tp,
      sdt: data.sdt,
      email: data.email,
      diachi: data.diaChi,
      hash_password: bcrypt.hashSync(data.password, 10)
     });
     _user.save((error, _data) => {
      if (error) {
       resolve({
        errCode: 2,
        message: { error }
       })
      }
      if (_data) {
       resolve({
        errCode: 0,
        message: 'dang nhap thanh cong'
       })
      }
     })
    }
   })
  } catch (error) {
   reject({ error })
  }
 })
}
exports.signInService = async (data) => {
 return new Promise(async (resolve, reject) => {
  try {
   let user = await User.findOne({ email: data.email });
   if (user) {
    resolve({ errCode: 0, message: user });
   } else {
    resolve({
     errCode: 2,
     message: 'emai khong ton tai!'
    })
   }

  } catch (error) {
   reject(error)
  }
 })
}
