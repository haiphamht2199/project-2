const express = require('express');
const { addCategory, getCategories, updateCategory, deleteCategory, getCategoryById } = require('../../controlers/admin/category');
const { RequestAdminSignin } = require('../../Middleware/index')
const router = express.Router();


router.post('/admin/category/create', addCategory);
router.get('/admin/category/getcategory', getCategories);
router.delete('/admin/getcategoryById', getCategoryById);
router.put('/admin/category/updatecategory/:id', getCategories)
router.delete('/admin/category/delete', deleteCategory)
module.exports = router;