class User2FAController {
    // [GET] /
    index(req, res, next) {
        res.render('2fa', {
            layout: 'user2FA'
        });
    }
}

module.exports = new User2FAController;