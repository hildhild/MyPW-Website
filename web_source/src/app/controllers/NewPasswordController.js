class NewPasswordController {
    // [GET] /
    index(req, res, next) {
        res.render('newpassword', {
            layout: 'user2FA'
        });
    }
}

module.exports = new NewPasswordController;