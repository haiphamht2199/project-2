const mongoose = require('mongoose');

const CustomPriceSchema = mongoose.Schema({
 name: {
  type: String,
  trim: true
 },
 status: {
  type: Boolean,
  required: true,
  default: 0
 },
 productType: {
  type: String,
  required: true,
  default: 0
 },
 selecProduct: {
  type: Array,
 },
 value: {
  type: Number,
  required: true
 }

}, { timestamps: true });

module.exports = mongoose.model("CP", CustomPriceSchema);