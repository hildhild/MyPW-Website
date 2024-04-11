const userModel = require('../../models/user');
const passwordModel = require('../../models/password');

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

class HomepageController {
    // [GET] /
    async index(req, res, next) {
        const username = req.session.user.username;
        const user = await userModel.findUsername(username);
        var passwordItems = await passwordModel.getPasswordsFrom(username);
        if (passwordItems) {
            passwordItems = passwordItems.map((item) => ({
                ...item,
                dayCreate: formatDateTime(item.dayCreate),
                dayExpire: formatDateTime(item.dayExpire),
                lastAccessDay: formatDateTime(item.lastAccessDay)
            }))
        }
        res.render('user/homepage', {
            homepageActive: true,
            user: user[0],
            passwordItems: passwordItems
        });
    }

    login(req, res, next) {
        res.redirect('/login');
    }
}

module.exports = new HomepageController;