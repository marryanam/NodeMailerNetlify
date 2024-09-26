const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    try {
        const { name, email, message } = JSON.parse(event.body);

        const mailOptions = {
            from: "marryana.m@gmail.com",
            to: 'amynarra@gmail.com',
            subject: 'New Contact Form Submission',
            text: `Заявка від ${name}!\nEmail: ${email}\nТекст: ${message}`
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: 'Email sent successfully!',
        };
    } catch (error) {
        console.error('Error sending email:', error);

        return {
            statusCode: 500,
            body: `Error sending email: ${error.message}`,
        };
    }
};
