const passwordModel = require('../../models/password');
const user = require('../../models/user');

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

class PassmanController {
    // [GET] /
    async index(req, res, next) {
        const username = req.session.user.username;
        var passwordItems = await passwordModel.getPasswordsFrom(username);
        if (passwordItems) {
            passwordItems = passwordItems.map((item) => ({
                ...item,
                dayCreate: formatDateTime(item.dayCreate),
                dayExpire: formatDateTime(item.dayExpire),
                lastAccessDay: formatDateTime(item.lastAccessDay)
            }))
        }
        res.render('user/passman', {
            passmanActive: true,
            passwordItems: passwordItems
        });
    }

    // [POST] /
    postPassword(req, res, next) {
        var add_website = req.body['add_website'];
        var add_password = req.body['add_password'];
        if (add_website && add_password) {
            const username = req.session.user.username;
            passwordModel.addNewPassword(username, add_website, add_password)
                .then(() => res.redirect('back'));
        }
        else return res.redirect('back');
    }
    
    // [DELETE] / :id
    deletePassword(req, res, next) {
        var id = req.params.id;
        const username = req.session.user.username;
        passwordModel.deletePassword(username, id)
            .then(() => res.redirect('back'));
    }

    // [GET] / :id / passinfo
    async passInfo(req, res, next) {
        var passInfo = await passwordModel.findUrl(req.session.user.username, req.params.id);
        if (passInfo) {
            passInfo = {
                ...passInfo,
                dateCreate: passInfo.dayCreate.toLocaleDateString(),
                timeCreate: passInfo.dayCreate.toLocaleTimeString(),
                dateExpire: passInfo.dayExpire.toLocaleDateString(),
                timeExpire: passInfo.dayExpire.toLocaleTimeString(),
                lastAccessDay: formatDateTime(passInfo.lastAccessDay)
            }
            return res.render('user/passinfo', {
                passmanActive: true,
                passInfo: passInfo
            });
        }
        else return res.redirect('back');
        
    }

    // [PATCH] / :id / passinfo
    patchPassword(req, res, next) {
        const id = req.params.id;
        const username = req.session.user.username
        passwordModel.findUrl(username, id)
            .then((passItem) => {
                if (passItem.password === req.body.oldPassword) {
                    passwordModel.patchPassword(username, id, req.body.newPassword)
                        .then(() => res.redirect('back'));
                }
                else return res.redirect('back');
            }); 
        

        
    }
}

module.exports = new PassmanController;