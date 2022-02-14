const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
 user: {
  type: mongoose.Types.ObjectId,
  ref: 'User',
  required: true
 },
 totalAmount: {
  type: Number,
  required: true
 },
 adress: {
  type: String,
  required: true
 },
 phoneNumber: {
  type: Number,
  required: true
 },
 items: {
  type: Object,
  required: true
 },
 paymentType: {
  type: String,
  required: true
 },
 orderStatus: [
  {
   type: {
    type: String,
    emum: ["đặt hàng", "xác nhận", "đang đóng hàng", "đang vận chuyển", "đã giao hàng"],
    default: "đặt hàng"
   },
   date: {
    type: Date
   },
   isCompleted: {
    type: Boolean,
    default: false
   }
  }
 ]
}, { timestamps: true });
module.exports = mongoose.model('Order', OrderSchema);