const express = require('express');

const router = express.Router();
// const multer = require("multer");
// const shortid = require("shortid");
// const path = require("path");
const { addProduct, getproductById, deleteById, getProducts, getTotalProduct, SPbanChayNhat, TOP3SPbanChayNhat } = require('../../controlers/admin/product');
const { RequestAdminSignin } = require('../../Middleware/index')

router.post('/admin/product/create', addProduct);
router.delete('/admin/productId', getproductById);//get
router.get('/admin/products', getProducts);
router.delete('/admin/product/delete', deleteById);
router.get('/admin/IcomeTotalProduct/:pid', getTotalProduct);
router.get('/admin/income', getTotalProduct);
router.get('/admin/sapbanchaynhat', SPbanChayNhat);
router.get('/admin/top3sapbanchaynhat', TOP3SPbanChayNhat)
module.exports = router;