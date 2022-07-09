const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = async (mailOptions) => await sgMail.send({ from: process.env.MAIL_FROM, ...mailOptions })