import nodemailer from "nodemailer"
import { config } from "dotenv"

config()

const sendMail = async () => {

  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      type:"oauth2",
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS
    }
  })

  const info = await transporter.sendMail({
    from: "'super admin' <admin@admin.com>",
    to:"<nbamroliya40@gmail.com>",
    subject:"forgot password",
    text:"your password reset mail",
    html: "<h1>this is password reset mail</h1>"
  })

  console.log(info.messageId,nodemailer.getTestMessageUrl(info))
}

sendMail()
