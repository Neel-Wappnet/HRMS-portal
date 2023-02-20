import * as jwt from "jsonwebtoken";
import { config } from "dotenv";
import { NextFunction,Response,Request } from "express";

config()

//access token generate which take payload and return token
export const generateAccessToken = (email:string):string=>{
  return jwt.sign({
    payload:email
  },
  process.env.JWT_SECRET!,
  {expiresIn:'1d'})
}

//verify the access token for user authorization
export const verifyAccessToken = (req:Request,res:Response,next:NextFunction)=>{
  
  const authHeader = req.headers['authorization']
  const token =  authHeader!.split(' ')[1]

  if(!token) res.status(401).json({msg:"empty authorization token"})

  const verifyToken = jwt.verify(token,process.env.JWT_SECRET!)
  console.log(verifyToken);
  

  if(verifyToken){next(verifyToken)}
  else{
    res.status(403).json({msg:"access denied"})
  }
}