const generatePassword = require('../../api/generator');
class PassgenController {
    // [GET] /
    index(req, res, next) {
        if(req.session.password) {
            const password = req.session.password;
            req.session.password = null;
            res.render('user/passgen', {
                passgenActive: true,
                password: password
            });
        }
        else{
            res.render('user/passgen', {
            passgenActive: true
            });
        }
    }
    // [POST] /generate
    async generate(req, res, next) {
        const length = req.body.length;
        // console.log(req.body)
        const useDigit = req.body.useDigit === 'on';
        const digits = useDigit ? req.body.digits: '';
        const useSpecialchar = req.body.useSpecialchar === 'on';
        const specialChars = useSpecialchar?  req.body.specialChars : '';
        const password = await generatePassword(length,useDigit, digits, specialChars, useSpecialchar);
        // req.session.password = password;
        res.render('user/passgen', {
            passgenActive: true,
            password: password
        });
    }
}



module.exports = new PassgenController; 