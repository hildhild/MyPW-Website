const loginRouter = require('./login');
/*  User space */
const homepageRouter = require('./user/homepage');
const passmanRouter = require('./user/passman');
const passinfoRouter = require('./user/passinfo');
const passgenRouter = require('./user/passgenerate');
const feedbackRouter = require('./user/feedback');
const userinfoRouter = require('./user/userinfo');
const passAnaRouter = require('./user/passanalyze');

/* Adminstartor space */
const adminHomepageRouter = require('./admin/homepage');
const adminPassmanRouter = require('./admin/passman');
const adminPassgenRouter = require('./admin/passgen');
const adminFeedbackRouter = require('./admin/feedback');
const adminUserListRouter = require('./admin/userList');
const adminInfoRouter = require('./admin/adminInfo');

function route(app) {
    app.use('/login', loginRouter);
    /*  User space */
    app.use('/', homepageRouter);
    app.use('/passman', passmanRouter);
    // app.use('/passinfo', passinfoRouter);
    app.use('/passgen', passgenRouter);
    app.use('/feedback', feedbackRouter);
    app.use('/userinfo', userinfoRouter);
    app.use('/analyze', passAnaRouter)

    /* Adminstartor space */
    app.use('/admin', adminHomepageRouter);
    app.use('/admin/passman', adminPassmanRouter);
    app.use('/admin/passgen', adminPassgenRouter);
    app.use('/admin/feedback', adminFeedbackRouter);
    app.use('/admin/user-list', adminUserListRouter);
    app.use('/admin/info', adminInfoRouter);
}

module.exports = route;