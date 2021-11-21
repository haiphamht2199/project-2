const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
 ten: {
  type: String,
  required: true,
 },
 ho: {
  type: String,
  required: true,
 },
 email: {
  type: String,
  require: true,
  index: true,
  unique: true,
  sparse: true
 },
 diachi: {
  type: String,
  required: true,
 },
 tp: {
  type: String,
  required: true,
 },
 sdt: {
  type: Number,
  required: true,
 },
 hash_password: {
  type: String,
  required: true,
 },
 pofilePicture: { type: String },
 role: {
  type: String,
  default: "user",
 }
})
module.exports = mongoose.model('User', UserSchema);