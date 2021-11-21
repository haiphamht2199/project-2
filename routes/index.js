const express = require('express');
const { index } = require('../controlers');

const router = express.Router();

router.get('/', index);
router.get('/signup');

module.exports = router;