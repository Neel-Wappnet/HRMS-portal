import bcrypt from "bcrypt"

export const hashPassword = {
  hash: async(password:string):Promise<string> => {
    return await bcrypt.hash(password,10)
  },
  verify: async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
  },
}