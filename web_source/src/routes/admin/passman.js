const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../../middlewares/session');

const adminPassmanController = require('../../app/controllers/admin/PassmanController');

router.get('/', isAuthenticated, isAdmin, adminPassmanController.index);

module.exports = router;