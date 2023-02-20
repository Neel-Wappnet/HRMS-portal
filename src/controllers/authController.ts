import { Request, Response } from "express";
import { prisma } from "../config/dbConnection";
import { generateAccessToken } from '../config/jwtToken';
import { hashPassword } from "../middleware/hashPassword";

const authController = {
  login: async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body

    //check that feilds are not empty
    if (!(email && password)) res.json({ msg: "all fields are required..!!" })

    //find user email into database and save into user
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    
    if (!user) res.status(404).json({ msg: "user is not exist..!!" })
    else {
      //check password
      const match =await hashPassword.verify(password,user.password)
      
      if (!match) res.status(401).json({ msg: "Invalid credentials" })
      else {
        const accessToken = generateAccessToken(email)
        res.status(200).json({ email, accessToken })
        
      }
    }

  },

  logout: async (req: Request, res: Response): Promise<void> => {  },

  changePassword: async (req: Request, res: Response): Promise<void> => {
    //Todo:create session for change password and after that check old password and verify new password
    // const {oldPassword,newPassword,repeatPassword} = req.body
    
  },

  forgotPassword: async (req: Request, res: Response): Promise<void> => {
    
    

  }
}

export default authController