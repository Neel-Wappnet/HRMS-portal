import * as nodemailer from "nodemailer"
import { config } from "dotenv"
config()

export const sendMail = (receiver: string, subject: string, content: string) => {

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS
    }
  })

  const mailOptions = {
    from: process.env.MAIL_ID,
    to: receiver,
    subject: subject,
    html: content
  }
  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      // console.log(info);
    }
  })
}


