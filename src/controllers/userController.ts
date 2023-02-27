import { Request, Response } from "express"
import { prisma } from "../config/dbConnection"
import { hashPassword } from "../middleware/hashPassword"

export const userController = {
  changePassword: async (req: Request, res: Response): Promise<Response> => {
    const { oldPassword, newPassword, confirmPassword, user } = req.body

    const findUser = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    })

    if (!findUser) {
      return res.status(404).json({
        status: false,
        msg: "user is not exist"
      })
    }

    const verifyPass = await hashPassword.verify(oldPassword, findUser.password)
    if (!verifyPass) {
      return res.status(401).json({
        status: false,
        msg: "wrong password"
      })
    }

    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        status: false,
        msg: "new password and confirm password does not match"
      })
    }

    const hashPass = await hashPassword.hash(newPassword)

    await prisma.user.update({
      where: {
        email: user.email
      },
      data: {
        password: hashPass
      }
    })

    return res.status(200).json({
      status: true,
      msg: "password changed successfully"
    })
  },

  getUser: async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)

    const findUser = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!findUser) {
      return res.status(404).json({
        status: false,
        msg: "user not found"
      })
    }

    return res.status(200).json({
      status: true,
      msg: "user data",
      data: { findUser }
    })
  }
}