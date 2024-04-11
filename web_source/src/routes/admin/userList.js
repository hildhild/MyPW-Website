const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../../middlewares/session');

const adminUserListController = require('../../app/controllers/admin/UserListController');

router.get('/', isAuthenticated, isAdmin, adminUserListController.index);
router.get('/check-user-list', isAuthenticated, isAdmin, adminUserListController.openCheckUserListForm);
// router.get('/check-user-info', isAuthenticated, isAdmin, adminUserListController.openCheckUserInfoForm);
router.get('/check-user-info/:username', isAuthenticated, isAdmin, adminUserListController.openCheckUserInfoFormUsername);
router.get('/check-frequence', isAuthenticated, isAdmin, adminUserListController.openCheckFrequenceForm);

module.exports = router;