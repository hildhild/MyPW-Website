const userModel = require('../../models/user');
const feedbackModel = require('../../models/feedback');

class FeedbackController {
    // [GET] /
    async index(req, res, next) {
        const currentUser = req.session.user.username;
        const currentUserInfo = await userModel.findUsername(currentUser);
        const currentUserFeedback = await feedbackModel.findFeedbackOfUser(currentUser);
        const {averageStar, feedbackCount  } = await feedbackModel.calculateAverageFeedbackStar();
        var currentUserFeedbackItem;
        var hasCommented = false;
        if (currentUserFeedback != null)
        {
            hasCommented = true;
            currentUserFeedbackItem = currentUserFeedback.map(item => {
                item.stars = Array.from({ length: 5 }, (_, index) => index < item.star);
                return item;
            });
        }
    
        res.render('user/feedback', {
            feedbackActive: true,
            hasCommented,
            currentUserInfo: currentUserInfo,
            currentUserFeedbackItem: currentUserFeedbackItem,
            averageStar: averageStar,
            feedbackCount : feedbackCount ,
        });
    }

    // [POST] /
    addFeebackRes(req, res, next) {
        var feedback = req.body.feedback;
        var star = req.body.star;
        if (feedback && star) {
            var username = req.session.user.username;
            feedbackModel.addFeedback(username, feedback, star)
                .then(() => res.redirect('back'))
        }
        else return res.redirect('back');
    }
    
    // [DELETE] /
    deleteFeebackRes(req, res, next) {
        var username = req.session.user.username;
        feedbackModel.deleteFeedback(username)
            .then(() => res.redirect('back'))
    }

    // [PATCH] /
    patchFeebackRes(req, res, next) {
        var feedback = req.body.feedback;
        var star = req.body.star;
        if (feedback && star) {
            var username = req.session.user.username;
            feedbackModel.patchFeedback(username, feedback, star)
                .then(() => res.redirect('back'))
        }
        else return res.redirect('back');
    }
}

module.exports = new FeedbackController;