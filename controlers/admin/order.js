const Order = require('../../models/order');
const Product = require('../../models/product')
exports.updateOrder = async (req, res, next) => {

 await Order.updateOne(
  { _id: req.body.payload.orderId, "orderStatus.type": req.body.payload.type },
  {
   $set: {
    "orderStatus.$": [
     { type: req.body.payload.type, date: new Date(), isCompleted: true },
    ],
   },
  }
 );

 const order = await Order.findOne({ _id: req.body.orderId });
 return res.status(201).json({ order })
}
exports.getOrders = async (req, res, next) => {
 try {
  const orders = await Order.find({}).select("user items.product items.name items.imageProduct items.quantity items.price totalAmount adress phoneNumber paymentType orderStatus").populate({ path: "user", select: "_id firstName lastName" });
  return res.status(200).json({ orders })
 } catch (error) {
  return res.status(400).json({ error })
 }
}
exports.getOrderDetail = async (req, res, next) => {

 try {
  const id = req.body.payload;
  const order = await Order.findOne({ _id: id }).select("user items totalAmount adress phoneNumber paymentType orderStatus").populate({ path: "user", select: "_id firstName lastName" });
  return res.status(200).json({ order })
 } catch (error) {

 }

}
exports.getincome = async (req, res, next) => {
 const date = new Date();
 const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
 const lastYear = new Date(date.setFullYear(date.getFullYear() + 1));


 const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
 try {
  const income = await Order.aggregate([
   {
    $match: {
     createdAt: { $gte: lastMonth },
    },
   },
   {
    $project: {
     month: { $month: "$createdAt" },
     sales: "$totalAmount",
    },
   },
   {
    $group: {
     _id: "$month",
     total: { $sum: "$sales" },
    },
   },
  ]);
  res.status(200).json(income);
 } catch (err) {
  res.status(500).json(err);
 }
}

