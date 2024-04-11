const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../../middlewares/session');

const adminFeedbackController = require('../../app/controllers/admin/FeedbackController');

router.get('/', isAuthenticated, isAdmin, adminFeedbackController.index);

module.exports = router;