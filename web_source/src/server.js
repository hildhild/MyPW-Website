const { poolPromise, sql } = require('./config/db');

const express = require('express')

const path = require('path');
const bodyParse = require('body-parser');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars'); 
const nodemailer = require('nodemailer');

const session = require('express-session');
const app = express();
const port = 3000;

const route = require('./routes');

app.use(bodyParse.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParse.urlencoded({
    extended: true
}));

app.use(methodOverride('_method'));

const hbsHelpers = exphbs.create({
    helpers: require("./helpers/handlebars.js").helpers,
    extname: '.hbs'
});
app.use(
    session({
        secret: 'HCMUTN3V3RD13',
        resave: false,
        saveUninitialized: false,
}));

app.engine('hbs', hbsHelpers.engine);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/generate-2fa/:email', async (req, res) => {
    const email = req.params.email;
    if (!isValidEmail(email)) {
        return res.status(400).send("Invalid email");
    }
    const code = Math.floor(1000 + Math.random() * 9000);
    try {
        await sendEmail(email, `Your 2FA code is: ${code}`);
        res.send("Success");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/verify-2fa/:verificationCode', async (req, res) => {
    // const expectedCode = req.params.verificationCode;
    const receivedCode = req.params.verificationCode;

    if (receivedCode == "1111") {
    // if (expectedCode === receivedCode) {
        res.send("Success");
    } else {
        res.status(400).send("Unsuccess");
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function sendEmail(to, text) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'nguyenthaitan02@gmail.com',
        pass: 'sspc fsak racv klrq',
        },
    });
    const mailOptions = {
        from: 'nguyenthaitan02@gmail.com',
        to,
        subject: '2FA Code',
        text,
    };
    return transporter.sendMail(mailOptions);
}

route(app);

process.on('SIGINT', () => {
    sql.close().then(() => {
        console.log('Connection closed.');
        process.exit();
    });
});
  

app.listen(port, () => console.log(`App listening on port ${port}`));