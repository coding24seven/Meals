
function sendEmailAlert(subject, body) {
  const nodemailer = require('nodemailer');
  const fs = require("fs");

  console.log("Checking email-alert configuration files...")

  // Check if the main configuration file is readable.
  fs.access("./server/config/email-env.js", fs.constants.R_OK, (err) => {
    if (!err) {
      const emailVars = require("../config/email-env.js")
      console.log("Main email-alert configuration file exists.")
      finishSendingEmailAlert(emailVars)
    } else {
      console.log("Main email-alert configuration file does not exists.")
      // as the main configuration file was not readable, check if at least the template configuration file is readable.
      fs.access("./server/config/email-env.template.js", fs.constants.R_OK, (err) => {
        if (!err) {
          const emailVars = require("../config/email-env.template.js")
          console.log("Although the main email-alert configuration file does not exist, the email-alert configuration TEMPLATE file does exist and can be utilized if it contains a valid configuration.")
          finishSendingEmailAlert(emailVars)
        }
        else {
          // no configuration files were found or readable
          console.log("No email-alert configuration files exist. No email alerts will be sent.")
        }
      })
    }
  });

  // proceed to sending an email alert if the configuration variables exist
  function finishSendingEmailAlert(emailVars) {

    // abort if configuration incomplete
    if (!emailVars || !emailVars.EMAIL_ALERT_CONFIGURATION_COMPLETED) {
      console.log("Unfortunately, the email-alert configuration is missing from the file, so no email alerts will be sent.")
      return
    }

    // continue if configuration complete
    console.log("Email alert configuration is present in the file. Sending an email alert...")

    const transporter = nodemailer.createTransport({
      host: emailVars.HOST,
      port: emailVars.HOST_SMTP_PORT,
      secureConnection: true,
      auth: {
        user: emailVars.SENDER_USER,
        pass: emailVars.SENDER_PASSWORD
      },
      tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
      from: emailVars.SENDER_USER,
      to: emailVars.RECEIVER_USER,
      subject,
      text: body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) { console.log(error) }
      else { console.log('Email alert sent: ' + info.response) }
    });
  } // finishSendingEmailAlert() ends
} // sendEmailAlert ends

/// EXPORT
module.exports = sendEmailAlert
