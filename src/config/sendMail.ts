import * as nodemailer from "nodemailer"
import { config } from "dotenv"
config()

const sendMail = (receiver: string, subject: string, type: string, email?: string, password?: string, filePath?: string) => {

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

  if (type === "login credential") {
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: receiver,
      subject: subject,
      html: `<h3>your email is: <b>${email}</b> and password is <b>${password}</b></h3>`
    }
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
    })
  } else if (type === "forgot password") {
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: receiver,
      subject: subject,
      html: { path: filePath }
    }
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
    })
  }

}

