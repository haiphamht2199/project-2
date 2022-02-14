const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
 name: {
  type: String,
  required: true,
  trim: true
 },
 slug: {
  type: String,
  required: true,
  trim: true
 },
 quantity: {
  type: Number,
  required: true
 },
 price: {
  type: Number,
  required: true
 },
 daBan: {
  type: Number,
  default: 0
 },
 stock:{
  type: Number,
  required: true
 },
 description: {
  type: String,
   required: true
 },
 offer: {
  type: Number,
  default:0
 },
 color: {
  type: String,
  required: true
 },
 ram: {
  type: String,
  required: true
 },
 boNhoTrong: {
  type: String,
  required: true
 },
 heDieuHanh: {
  type: String,
  required: true
 },
 camera: {
  type: String,
  required: true
 },
 imageProduct: {
  type: String,
  required: true
 },
 reviews: [
  {
   userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   comment: { type: String, required: true },
   rating: { type: Number, default: 0 }
  }
 ],
 numberReview: {
  type: Number,
  default: 0,
 },
 category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
 createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 updateAt: Date
}, {
 timestamps: true
});
module.exports = mongoose.model('Product', productSchema);