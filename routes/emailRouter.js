const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const outlookAccount = 'prasannakkoirala@outlook.com';
const outlookPassword = 'Prasanna#k13';

/* POST route for sending email */
router.post('/', async (req, res) => {
  try {
    const { name, email, content } = req.body;
    console.log(JSON.parse(JSON.stringify(req.body)));

    // create a new transporter object using nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: outlookAccount,
        pass: outlookPassword,
      },
    });

    // Define the email options
    const mailOptions = {
      from: '"Email Sender" <prasannakkoirala@outlook.com>', // sender address
      to: email, // list of receiver email addresses
      subject: 'Welcome to Node Email Sender', // Subject line
      html: `
        <h1>Hi ${name},</h1>
        <p>${content}</p>
        <p>Thank you for signing up for Node Email Sender. We hope you enjoy using it!</p>
        <p>Best Regards, <br />Node Email Team</p>
        `, // email body in HTML
    };

    // Send the email to the receiver
    const response = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', response.messageId);

    // Send a success response to the client
    res.status(200).json({ message: 'Email sent successfully!🎉' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending email!🥺' });
  }

  // next();
});

module.exports = router;
