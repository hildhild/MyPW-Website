const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../../middlewares/session');

const userinfoController = require('../../app/controllers/user/UserInfoController');

router.get('/', isAuthenticated, userinfoController.index);

module.exports = router;