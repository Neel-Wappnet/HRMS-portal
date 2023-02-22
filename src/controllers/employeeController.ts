import { Request, Response } from "express";
import { prisma } from "../config/dbConnection";
import { uploadImage } from "../config/cloudinary";



export const employeeController = {
  addEmployee: async (req: Request, res: Response): Promise<Response | void> => {
    
    const { empCode, name, email, departmentId, role, designation, birthDate, reportingUser, contactNo, address } = req.body
    await uploadImage(req.file!.path)

    // const findEmployee = await prisma.employee.findUnique({
    //   where: {
    //     email
    //   }
    // })

    // if (findEmployee) {
    //   return res.status(400).json({
    //     status: false,
    //     msg: "employee already exist"
    //   })
    // }

    // const findDepartment = await prisma.department.findUnique({
    //   where: {
    //     id: departmentId
    //   }
    // })

    // if (!findDepartment) {
    //   return res.status(400).json({
    //     status: false,
    //     msg: "invalid department"
    //   })
    // }








  },
  updateEmployee: async (req: Request, res: Response): Promise<void> => {
    //Todo: check that user is super admin then check all detail and update and save to database
  },
  deleteEmployee: async (req: Request, res: Response): Promise<void> => {
    //Todo:check employee is exist in database and the delete it
  },
  getAllEmployee: async (req: Request, res: Response): Promise<void> => {
    //Todo:get all employee
  },
  getEmployee: async (req: Request, res: Response): Promise<void> => {
    //Todo:get employee by req.params.id check in database 
  },
}