const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'jimlestonosoi42@gmail.com',
        pass: 'qptk ztkq lkkc jrkc'
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.error('SMTP Connection Failed:', error);
    } else {
        console.log('Server is ready to take our messages');
    }
});
