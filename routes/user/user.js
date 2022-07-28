const express = require('express');
const { AddToCart } = require('../../controlers/user/cart');
const { addOrder, BuyItNow } = require('../../controlers/user/order');
const { getProducts, getProduct, getCategories, getCategoryById, getRule } = require('../../controlers/user/product');
const { signUp, signin, AddComment, getOrders, getOrder, checkout, updateProfile } = require('../../controlers/user/user');
const { RequestUserSignin } = require('../../Middleware');

const router = express.Router();

router.post('/user/signup', signUp);
router.post('/user/signin', signin);
router.post('/user/cart/addtocart', RequestUserSignin, AddToCart);
router.post('/user/order/addOrder', RequestUserSignin, addOrder);
router.post('/user/order/buyitnow', BuyItNow);
router.get('/getproducts', getProducts);
router.post('/product/productId', getProduct);
router.post('/category/categoryId', getCategoryById);
router.get('/getCategory', getCategories);
router.get('/getrule', getRule);
router.post('/addcomment', AddComment);
router.post('/orders', getOrders);
router.post('/orderbyid', getOrder);
router.post('/checkout', checkout);
router.post('/updateprofile', updateProfile);
module.exports = router;