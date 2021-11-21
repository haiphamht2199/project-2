const express = require('express');
const { addPost } = require('../controlers/comment');
const router = express.Router();
router.post('/add/:id', addPost);
module.exports = router;