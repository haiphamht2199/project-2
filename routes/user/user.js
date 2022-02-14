const express = require('express');
const { AddToCart } = require('../../controlers/user/cart');
const { addOrder } = require('../../controlers/user/order');
const { signUp, signin } = require('../../controlers/user/user');
const { RequestUserSignin } = require('../../Middleware');

const router = express.Router();

router.post('/user/signup', signUp);
router.post('/user/signin', signin);
router.post('/user/cart/addtocart', RequestUserSignin, AddToCart);
router.post('/user/order/addOrder', RequestUserSignin, addOrder);

module.exports = router;