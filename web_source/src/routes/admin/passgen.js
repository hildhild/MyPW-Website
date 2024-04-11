const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../../middlewares/session');

const adminPassgenController = require('../../app/controllers/admin/PassgenController');

router.get('/', isAuthenticated, isAdmin, adminPassgenController.index);

module.exports = router;