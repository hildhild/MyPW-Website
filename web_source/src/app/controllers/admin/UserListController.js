const userModel = require('../../models/user');
const feedbackModel = require('../../models/feedback');


class AdminUserListController {
    // [GET] /
    index(req, res, next) {
        res.render('admin/userlist', {
            layout: 'main-admin',
            userlistActive: true
        });
    }

    // [GET] /check-user-list
    async openCheckUserListForm(req, res, next) {
        const userlist = await userModel.getAllData();
        res.render('admin/checkuserlist', {
            layout: 'main-admin',
            userlistActive: true,
            userItems: userlist
        });
    }
    
    // [GET] /check-user-info
    // async openCheckUserInfoForm(req, res, next) {
    //     const userInfo = await userModel.findUsername('john_doe');
    //     res.render('admin/checkuserinfo', {
    //         layout: 'main-admin',
    //         userlistActive: true,
    //         userInfoItem: userInfo
    //     });
    // }

    // [GET] /check-user-info/:username
    async openCheckUserInfoFormUsername(req, res, next) {
        const username = req.params.username;
        const userInfo = await userModel.findUsername(username);
        res.render('admin/checkuserinfo', {
            layout: 'main-admin',
            userlistActive: true,
            userInfoItem: userInfo
        });
    }
    
    // [GET] /check-frequence
    async openCheckFrequenceForm(req, res, next) {
        const userlist = await userModel.getAllData();
        const feedbacks = await feedbackModel.getAllData();
        const totalAccess = userlist.reduce((accum, curr) => accum + curr.totalAccess, 0)
        const feedbackCount = feedbacks.length;
        const avgScore = feedbacks.reduce((accum, curr) => accum + curr.star, 0) / feedbackCount;
        const floorAvgScore = Math.floor(avgScore);
        res.render('admin/checkfrequence', {
            layout: 'main-admin',
            userlistActive: true,
            totalAccess,
            feedbackCount,
            avgScore,
            floorAvgScore
        });
    }
}

module.exports = new AdminUserListController;