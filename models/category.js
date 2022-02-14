const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
 name: {
  type: String,
  // required: true,
  trim: true
 },
 slug: {
  type: String,
  // required: true,
  // unique: true
 },
 categoryImage: {
  type: String
 },
 status: {
  type: String,
  enum: ["yes", "no"],
  default: "yes"
 },
 createBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "user",
  // required: true
 },
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);