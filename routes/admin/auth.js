const express = require('express');
const { signup, signin, logout,getAllUser,getStats } = require('../../controlers/admin/auth');
const { ValidateSignupRequest, isRequiredValidate } = require('../../Validator/auth');
const router = express.Router();


router.post('/admin/signup', signup);
router.post('/admin/signin', signin);
router.post('/admin/signout', logout);
router.get('/admin/getAllUser',getAllUser);
router.get('/admin/getStats',getStats)
module.exports = router;