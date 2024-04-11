const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../../middlewares/session');

const adminUserInfoController = require('../../app/controllers/admin/UserInfoController');

router.get('/', isAuthenticated, isAdmin, adminUserInfoController.index);

module.exports = router;