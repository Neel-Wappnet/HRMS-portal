import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async ():Promise<void> => {
  const superAdmin = await prisma.user.create({
    data: {
      employeeId:null,
      email: "superadmin@gmail.com",
      password: "123456",
    }
  })
  console.log(superAdmin)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
