const nodemailer = require("nodemailer");

let transporter;

if (process.env.NODE_ENV === "production") {
    transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
} else {
    nodemailer.createTestAccount((err, account) => {
        if (err) return console.error(err);
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });
    });
}

async function sendVerificationEmail(email, code) {
    const info = await transporter.sendMail({
        from: "bizwhiz@noreply.com",
        to: email,
        subject: "Please verify your email",
        html: `<a href="${process.env.BASE_URL}/api/users/verify/${code}">Verify</a>`
    });

    console.log(`Message sent: ${info.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}

module.exports = { sendVerificationEmail };
