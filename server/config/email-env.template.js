/* 
* the environmental variables are either configured on the host, for example Heroku, or they are provided in this file
* once you've supplied your email credentials in this file:
* set EMAIL_ALERT_CONFIGURATION_COMPLETED: true
* you can also remove the word 'template' from the file name
* .gitignore this file!!!
*/

const emailVars = {
  HOST: process.env.EMAIL_HOST || "your smtp server",
  HOST_SMTP_PORT: process.env.EMAIL_HOST_SMTP_PORT || 465,
  SENDER_USER: process.env.EMAIL_SENDER_USER || "sender email address",
  SENDER_PASSWORD: process.env.EMAIL_SENDER_PASSWORD || "sender email password",
  RECEIVER_USER: process.env.EMAIL_RECEIVER_USER || "receiver email address",
  EMAIL_ALERT_CONFIGURATION_COMPLETED: process.env.EMAIL_ALERT_CONFIGURATION_COMPLETED || false
}

module.exports = emailVars
