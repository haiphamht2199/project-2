const express = require('express');
const { categoryProduct, info, searchPost } = require('../controlers/product')
const router = express.Router();

router.get('/:loai', categoryProduct)
router.get('/info/:id', info);
router.post('/search/all', searchPost);
module.exports = router;