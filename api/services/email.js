const nodemailer = require("nodemailer");

async function sendVerificationEmail(email, code) {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

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
