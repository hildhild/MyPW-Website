const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../../middlewares/session');

const passgenController = require('../../app/controllers/user/PassgenController');

router.get('/', isAuthenticated, passgenController.index);
router.post('/', isAuthenticated, passgenController.generate);
module.exports = router; 