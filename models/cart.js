const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
 email: { type: String },
 productId: { type: String },
 quantity: { type: Number, default: 1 },
 check: {
  type: Number,
  default: 0
 }
})
module.exports = mongoose.model('Cart', cartSchema)