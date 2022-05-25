const nodemailer = require("nodemailer");
const { NODE_ENV, EMAIL_USERNAME, EMAIL_PASSWORD, BASE_URL } = process.env;

let transporter;

if (NODE_ENV === "production") {
    transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD
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
        html: `<a href="${BASE_URL}/api/users/verify/${code}">Verify</a>`
    });

    if (NODE_ENV !== "production") {
        console.log(`Message sent: ${info.messageId}`);
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
}

async function sendNewPassword(email, newPassword) {
    const info = await transporter.sendMail({
        from: "bizwhiz@noreply.com",
        to: email,
        subject: "Your password has been reset",
        html: `<p>Your new password is: ${newPassword}</p>`
    });

    if (NODE_ENV !== "production") {
        console.log(`Message sent: ${info.messageId}`);
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
}

module.exports = { sendVerificationEmail, sendNewPassword };
