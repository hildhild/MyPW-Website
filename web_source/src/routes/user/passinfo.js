const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../../middlewares/session');

const passInfoController = require('../../app/controllers/user/PassInfoController');

router.get('/', isAuthenticated, passInfoController.index);

module.exports = router;