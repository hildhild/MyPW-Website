class PassInfoController {
    // [GET] /
    index(req, res, next) {
        res.render('user/passinfo', {
            passmanActive: true
        });
    }
}

module.exports = new PassInfoController;