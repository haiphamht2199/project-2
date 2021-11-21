const mongoose = require('mongoose');

const commentSchma = mongoose.Schema({
 idProduct: { type: String },
 email: { type: String },
 ho: { type: String },
 ten: { type: String },
 content: { type: String, required: true },
 dataTime: { type: Date },
 numberStar: { type: Number }
})
module.exports = mongoose.model('Comment', commentSchma);