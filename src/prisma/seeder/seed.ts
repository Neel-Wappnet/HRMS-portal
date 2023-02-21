import { PrismaClient } from '@prisma/client'
// import { randomPassword } from '../../middleware/randomPassword';
import { hashPassword } from '../../middleware/hashPassword';
const prisma = new PrismaClient()

const main = async ():Promise<void> => {
  const superAdmin = await prisma.user.create({
    data: {
      employeeId:null,
      email: "superadmin@gmail.com",
      password: await hashPassword.hash("123456"),
    }
  })
  console.log(superAdmin)
}
main()
  .then(async () => {
    await prisma.$connect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
