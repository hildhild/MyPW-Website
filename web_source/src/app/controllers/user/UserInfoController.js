const userModel = require('../../models/user');

class UserInfoController {
    // [GET] /
    async index(req, res, next) {
        const currentUser = req.session.user.username;
        const currentUserInfo = await userModel.findUsername(currentUser);

        res.render('user/userinfo', {
            // layout: 'main-admin',
            userinfoActive: true,
            currentUserInfo: currentUserInfo
        });
    }
}

module.exports = new UserInfoController;