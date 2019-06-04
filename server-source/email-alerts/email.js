const nodemailer = require('nodemailer');

export default function sendEmailAlert(subject, body) {

  if (process.env.EMAIL_ALERT_CONFIGURATION_COMPLETED != "true") return console.log("Unfortunately, the email-alert configuration is missing, so no email alerts will be sent.")

  // continue if configuration complete
  console.log("Email alert configuration is present. Sending an email alert...")

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_HOST_SMTP_PORT,
    secureConnection: true,
    auth: {
      user: process.env.EMAIL_SENDER_USER,
      pass: process.env.EMAIL_SENDER_PASSWORD
    },
    tls: { rejectUnauthorized: false }
  });

  const mailOptions = {
    from: process.env.EMAIL_SENDER_USER,
    to: process.env.EMAIL_RECEIVER_USER,
    subject,
    text: body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) { console.log(error) }
    else { console.log('Email alert sent: ' + info.response) }
  });
} // sendEmailAlert ends
