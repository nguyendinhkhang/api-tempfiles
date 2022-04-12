const nodemailer = require('nodemailer')
const EmailTemplate = require('./EmailTemplate')

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD
    }
  })
  const mailOptions = {
    from: `TempFiles 📁 <${options.from}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: EmailTemplate(options.content)
  }
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendEmail