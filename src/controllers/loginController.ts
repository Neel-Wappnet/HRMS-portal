import { Request,Response } from "express";
import User from "../database/models/user";
import bcrypt from "bcrypt"

const loginController = async (req: Request, res: Response):Promise<void> => {
  const { email, password } = req.body
  if (!(email && password)) res.json({ msg: "all fields are required..!!" })

  const user = await User.findOne({ where: { email } })
  if(!user) {
    res.json({ msg: "user not exists..!!" })
  }else{
    const validatePassword = await bcrypt.compare(password,user.password)
    validatePassword && res.json({msg:"Invalid creadential..!!"})
  }
}

export default loginController