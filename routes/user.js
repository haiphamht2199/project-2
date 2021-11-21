const express = require('express');
const { signUp, signUpPost, signIn, loginPost, logout, info, edit, editPost, support } = require('../controlers/user');
const router = express.Router();

router.get('/signup', signUp);
router.post('/signup', signUpPost);
router.get('/login', signIn)
router.post('/login', loginPost);

router.get('/logout', logout);
router.get('/info', info);
router.get('/support', support);
router.get('/edit', edit);
router.post('/edit', editPost)
module.exports = router;