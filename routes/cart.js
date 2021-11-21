const express = require('express');
const { addCart, list, Delete, checkout, checkoutPost, Orders, editAddress, editAddressPost, deleteOrders } = require('../controlers/cart');
const order = require('../models/order');
const router = express.Router();

router.get('/add/:id', addCart);
router.get('/list', list);
router.get('/delete/:id', Delete);
router.get('/checkout', checkout);
router.post('/checkout', checkoutPost);
router.get('/orders', Orders);
router.get('/editAddress/:id', editAddress);
router.post('/editAddress/:id', editAddressPost);
router.get('/deleteOrders/:id', deleteOrders)
module.exports = router;