const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../../middlewares/session');

const adminHomepageController = require('../../app/controllers/admin/HomepageController');

router.get('/', adminHomepageController.login);
router.get('/homepage', isAuthenticated, isAdmin, adminHomepageController.index);

module.exports = router;