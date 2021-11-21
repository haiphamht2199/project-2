const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
 email: { type: String },
 nguoiNhan: { type: String },
 sdtNguoiNhan: { type: Number },
 diaChiNhan: { type: String },
 listIdProduct: { type: Array },
 trangthai: { type: Boolean },
 timeData: { type: Date }
});
module.exports = mongoose.model('Order', orderSchema);