const express = require('express');
const { updateOrder, getOrders, getOrderDetail, getincome } = require('../../controlers/admin/order');
const { RequestAdminSignin } = require('../../Middleware');
const router = express.Router();


router.get('/admin/orders', getOrders);
router.post('/admin/order', getOrderDetail);
router.post('/admin/order/update', updateOrder);
router.get('/admin/order/income', getincome)
module.exports = router;