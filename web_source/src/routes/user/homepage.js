const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../../middlewares/session');

const homepageController = require('../../app/controllers/user/HomepageController');

router.get('/', homepageController.login);
router.get('/homepage', isAuthenticated, homepageController.index);

module.exports = router;