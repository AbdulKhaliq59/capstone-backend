const nodemailer = require('nodemailer')
require("dotenv/config");
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
})

async function sendEmail(sendTo, subject, content, link) {
    const info = await transporter.sendMail({
        from: 'kananuraabdulkhaliq59@gmail.com',
        to: sendTo,
        subject: subject,
        html: `<b>${content}</b><br>
                <a href='${link}'>Click here </a>  For ${subject}`
    })

    console.log("Message sent: ", info.messageId);
}

sendEmail().catch(console.error);

module.exports = {
    sendEmail
}