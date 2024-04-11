const userModel = require('../../models/user');

const formatDateTime = (date) => {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC'
    };
    return date.toLocaleString('en-US', options);
};

class AdminHomepageController {
    // [GET] /
    async index(req, res, next) {
        var user = await userModel.findUsername(req.session.user.username);
        var allUsers = await userModel.getAllData();
        allUsers = allUsers.map((user) => ({
            ...user,
            firstAccess: formatDateTime(user.firstAccess),
            lastAccess: formatDateTime(user.lastAccess)
        }));
        res.render('admin/homepage', {
            layout: 'main-admin',
            homepageActive: true,
            user: user[0],
            user_list: JSON.stringify(allUsers)
        });
    }

    login(req, res, next) {
        res.redirect('/login');
    }

}

module.exports = new AdminHomepageController;