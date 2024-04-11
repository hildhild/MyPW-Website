const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../../middlewares/session');

const feedbackController = require('../../app/controllers/user/FeedbackController');

router.get('/', isAuthenticated, feedbackController.index);
router.post('/', isAuthenticated, feedbackController.addFeebackRes);
router.patch('/', isAuthenticated, feedbackController.patchFeebackRes);
router.delete('/', isAuthenticated, feedbackController.deleteFeebackRes);

module.exports = router;