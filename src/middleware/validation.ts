import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../config/jwtToken';
export const validation = {
  varifyAccessTokenAndSuperAdmin :(req:Request,res:Response,next:NextFunction)=>{
   const payload =  verifyAccessToken(req,res,next)
   console.log(payload)
  }
}