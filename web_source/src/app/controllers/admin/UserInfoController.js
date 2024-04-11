const userModel = require('../../models/user');

class AdminUserInfoController {
    // [GET] /
    async index(req, res, next) {
        const currentAdmin = req.session.user.username;
        const currentAdminInfo = await userModel.findUsername(currentAdmin);

        res.render('admin/info', {
            layout: 'main-admin',
            userinfoActive: true,
            currentAdminInfo: currentAdminInfo
        });
    }
}

module.exports = new AdminUserInfoController;