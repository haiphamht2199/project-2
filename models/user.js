const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
 firstName: {
  type: String,
  required: true,
  trim: true,
  min: 3,
  max: 30
 },
 lastName: {
  type: String,
  required: true,
  trim: 3,
  min: 3,
  max: 30
 },
 userName: {
  type: String,
  required: true,
  trim: true,
 },
 email: {
  type: String,
  required: true,
  trim: true,
  unique: true,
  lowercase: true
 },
 hash_password: {
  type: String,
  required: true
 },
 role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
 },
 contactNumber: {
  type: Number
 },
 profilePicture: {
  type: String
 },
 status: {
  type: Boolean,
  default: false
 },
 address: {
  type: String,
  required: true
 }
}, { timestamps: true });
module.exports = mongoose.model("User", userSchema);