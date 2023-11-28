const express = require('express');
const router = express.Router();
const validate = require('../validates/account.validate');
const middleware = require('../middlewares/auth.middleware');
const controller = require('../controllers/user.controller');

router.post('/register', validate.account, controller.register);
router.post('/login', controller.login);
router.post('/password/forgot', controller.forgotPassword);
router.post('/password/otp', controller.otpPassword);
router.post('/password/reset', controller.resetPassword);
router.get('/detail', middleware.requireAuth, controller.detail);
router.get('/list', middleware.requireAuth, controller.list);

module.exports = router;