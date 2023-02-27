import * as jwt from "jsonwebtoken";
import { config } from "dotenv";
import { NextFunction, Response, Request } from "express";
import { prisma } from "./dbConnection";

config()

//access token generate which take payload and return token
export const generateAccessToken = (id: number, email: string): string => {
  return jwt.sign({
    payload: { id, email }
  },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' })
}


//verify the access token for user authorization
export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers['authorization']

  if (!authHeader) return res.status(401).json({
    status: false,
    msg: "empty authorization token"
  })
  const token = authHeader.split(' ')[1]

  const verifyToken = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload
  const { email } = verifyToken.payload

  const findUser = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if (!findUser) return res.status(404).json({ msg: "user is not exist..!!" })

  const { password, ...userData } = findUser

  if (verifyToken) {
    req.body.user = userData
    next()
  } else {
    res.status(403).json({ msg: "access denied" })
  }
}