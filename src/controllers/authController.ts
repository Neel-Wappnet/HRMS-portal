import { Request, Response } from "express";
import { prisma } from "../config/dbConnection";
import { generateAccessToken } from '../config/jwtToken';
import { hashPassword } from '../middleware/hashPassword';
import { otpGenerator } from "../middleware/otpGenerator";
import { sendMail } from "../config/sendMail";
import { timeDifferance } from "../middleware/timeDifferance";

const authController = {
  login: async (req: Request, res: Response): Promise<Response> => {

    const { email, password } = req.body

    //check that feilds are not empty
    if (!(email && password)) return res.status(400).json({
      status: false,
      msg: "all fields are required"
    })

    //find user email into database and save into user
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "user is not exist"
      })
    } else {
      //check password
      const match = await hashPassword.verify(password, user.password)

      if (!match) {
        return res.status(401).json({
          status: false,
          msg: "Invalid credentials"
        })
      } else {
        const accessToken = generateAccessToken(user.id, email)
        return res.status(200).json({ email, accessToken })
      }
    }
  },

  logout: async (req: Request, res: Response): Promise<void> => { },

  forgotPassword: async (req: Request, res: Response): Promise<Response> => {

    const { email } = req.body
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "user is not exist"
      })
    } else {
      const otp = otpGenerator()
      sendMail(email, "forgot password", `<span>your otp for the forgot password is <b>${otp}</b></span>`)
      const findUser = await prisma.otp.findUnique({
        where: { email }
      })
      if (!findUser) {
        await prisma.otp.create({
          data: {
            email,
            otp
          }
        })
      } else {
        await prisma.otp.update({
          where: {
            email
          },
          data: {
            otp
          }
        })
      }
      return res.status(200).json({ status: true, msg: "otp has been send on your registered email", data: { email } })
    }
  },

  newPassword: async (req: Request, res: Response): Promise<Response> => {
    const { otp, email, password, confirmPassword } = req.body

    const findUser = await prisma.otp.findUnique({
      where: { email }
    })

    if (!findUser) {
      return res.status(404).json({
        status: false,
        msg: "user is not exist"
      })
    }

    if (otp !== findUser.otp) {
      return res.status(404).json({
        status: false,
        msg: "invalid otp"
      })
    }

    const diff = timeDifferance(findUser.updatedAt)
    if (diff > 300000) {
      return res.status(410).json({
        status: false,
        msg: "otp expired"
      })
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        status: false,
        msg: "password and confirm password are not match"
      })
    }

    const hashPass = await hashPassword.hash(password)

    await prisma.user.update({
      where: { email },
      data: {
        password: hashPass
      }
    })

    return res.status(200).json({
      status: true,
      msg: "password updated successfully"
    })
  }
}


export default authController