import { Request, Response } from "express";
import bcrypt from "bcrypt"

const authController = {
  login: async (req: Request, res: Response): Promise<void> => {
    // const { email, password } = req.body
    // if (!(email && password)) res.json({ msg: "all fields are required..!!" })

    // const user = await User.findOne({ where: { email } })
    // if (!user) {
    //   res.json({ msg: "user not exists..!!" })
    // } else {
    //   const validatePassword = await bcrypt.compare(password, user.password)
    //   validatePassword && res.json({ msg: "Invalid creadential..!!" })
    // }

    //Todo: check valid detail assign jwt 
  },

  logout: async (req: Request, res: Response):Promise<void> => {
    //Todo:add jwt and after delete delete token
  },

  changePassword: async (req: Request, res: Response):Promise<void> => {
    //Todo:create session for change password and after that check old password and verify new password
  },

  forgotPassword: async (req: Request, res: Response):Promise<void> => {
    //Todo:create session and send otp and generate new password
  }
}

export default authController