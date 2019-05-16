const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_HOST_SMTP_PORT,
  secureConnection: true,
  auth: {
    user: EMAIL_SENDER_USER,
    pass: EMAIL_SENDER_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

const mailOptions = {
  from: EMAIL_SENDER_USER,
  to: EMAIL_RECEIVER_USER,
  subject: 'Meals app accessed',
  text: 'Somebody is accessing the Meals app'
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
