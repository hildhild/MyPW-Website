class AdminPassgenController {
    // [GET] /
    index(req, res, next) {
        res.render('admin/passgen', {
            layout: 'main-admin',
            passgenActive: true
        });
    }
}

module.exports = new AdminPassgenController;