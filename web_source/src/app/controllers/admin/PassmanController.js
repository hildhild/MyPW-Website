class AdminPassmanController {
    // [GET] /
    index(req, res, next) {
        res.render('admin/passman', {
            layout: 'main-admin',
            passmanActive: true
        });
    }
}

module.exports = new AdminPassmanController;