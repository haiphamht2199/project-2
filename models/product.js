const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
 ten: {
  type: String,
  required: true
 },
 loai: {
  type: String,
  required: true
 },
 gia: {
  type: Number,
  required: true
 },
 ma: {
  type: String,
  required: true
 },
 mota: {
  type: String,
  required: true
 },
 hinhAnh: {
  type: String,
  required: true
 },

});
module.exports = mongoose.model('Product', productSchema);