import { Request, Response } from "express"
import { prisma } from "../config/dbConnection"
import { hashPassword } from "../middleware/hashPassword"

export const userController = {
  changePassword: async (req: Request, res: Response): Promise<Response> => {
    const {oldPassword,newPassword,confirmPassword,userEmail} = req.body

    
    const findUser = await prisma.user.findUnique({
      where:{
        email:userEmail
      }
    })

    if (!findUser) {
      return res.status(404).json({ 
        status:false,
        msg: "user is not exist" })
    }

    const verifyPass  = await hashPassword.verify(oldPassword,findUser.password)
    if(!verifyPass){ 
      return res.status(401).json({
      status:false,
      msg:"wrong password"
    })}

    if(newPassword !== confirmPassword) {
      return res.status(401).json({
      status:false,
      msg:"new password and confirm password does not match"
    })}

    const hashPass = await hashPassword.hash(newPassword)

    await prisma.user.update({
      where: {
        email:userEmail
      },
      data:{
        password:hashPass
      }
    })

    return res.status(200).json({
      status:true,
      msg:"password changed successfully"
    })

  },
}