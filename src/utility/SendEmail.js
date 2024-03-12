const nodemailer = require('nodemailer');

const SendEmail = async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'mail.urexotech.com',
        port: 465,
        secure: true,
        transporter: 'smtp',
        auth: {
            user: "mihir@urexotech.com",
            pass: '~sR4[bhaC[Qs'
        },tls: {
            rejectUnauthorized: false
        },
    });

    let mailOptions = {
        from: 'Task Manager MERN <mihir@urexotech.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return  await transporter.sendMail(mailOptions)
}
module.exports= SendEmail;