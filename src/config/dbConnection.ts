import { PrismaClient } from "@prisma/client";

export const prisma =new PrismaClient()

export const dbConnection = ()=>{
  try {
    prisma.$connect()
    .then(()=>console.log("database connected..!!"))
    .catch((err)=> console.log(err))
  } catch (err) {
    prisma.$disconnect()
  }
}