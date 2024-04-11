const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');
const user2faController = require('../app/controllers/User2FAController');
const newPasswordController = require('../app/controllers/NewPasswordController');

router.get('/', loginController.index);
router.post('/', loginController.verify);
router.delete('/logout', loginController.logout);

router.get('/2fa', user2faController.index);
router.get('/2fa/newPassword', newPasswordController.index);

module.exports = router;