const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../../middlewares/session');

const passmanController = require('../../app/controllers/user/PassmanController');

router.get('/', isAuthenticated, passmanController.index);
router.post('/', isAuthenticated, passmanController.postPassword);
router.delete('/:id', isAuthenticated, passmanController.deletePassword);

router.get('/:id/passinfo', isAuthenticated, passmanController.passInfo);
router.patch('/:id/passinfo', isAuthenticated, passmanController.patchPassword);

module.exports = router;