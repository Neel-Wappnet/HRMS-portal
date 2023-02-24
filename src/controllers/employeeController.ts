import { Request, Response } from "express";
import { prisma } from "../config/dbConnection";
import { uploadImage } from "../config/cloudinary";
import { stringToDate } from "../middleware/stringToDate";
import { randomPassword } from '../middleware/randomPassword';
import { hashPassword } from "../middleware/hashPassword";
import { sendMail } from "../config/sendMail";



export const employeeController = {
  addEmployee: async (req: Request, res: Response): Promise<Response> => {

    const data = JSON.parse(req.body.data)

    const { empCode, name, email, departmentId, role, designation, birthDate, reportingUser, contactNo, address } = data

    if (!(empCode && name && email && departmentId && role && designation && birthDate && reportingUser && contactNo && address)) {
      return res.status(400).json({
        status: false,
        msg: "all fields are required"
      })
    }

    const findEmployee = await prisma.employee.findUnique({
      where: {
        email
      }
    });

    if (findEmployee) {
      return res.status(400).json({
        status: false,
        msg: "employee already exist"
      })
    }

    const findDepartment = await prisma.department.findUnique({
      where: {
        id: departmentId
      }
    })

    if (!findDepartment) {
      return res.status(400).json({
        status: false,
        msg: "invalid department"
      })
    }

    if (!req.file) {
      return res.status(400).json({
        status: false,
        msg: "please upload profile image"
      })
    }
    const uploadedImage = await uploadImage(req.file!.path)
    // console.log(uploadedImage.secure_url)

    const addEmployee = await prisma.employee.create({
      data: {
        empCode,
        name,
        profileImage: uploadedImage.secure_url,
        email,
        departmentId,
        role,
        designation,
        birthDate: stringToDate(birthDate),
        reportingUser,
        contactNo,
        address
      }
    })

    const pass = randomPassword()

    await prisma.user.create({
      data: {
        email,
        employeeId: addEmployee.id,
        password: await hashPassword.hash(pass)

      }
    })

    sendMail(email, "Your Registration Done Successfully", `your email is <b>${email}</b> and password is <b>${pass}</b>`)

    return res.status(201).json({
      status: true,
      msg: "Employee added successfully",
      data: { addEmployee }
    })


  },
  updateEmployee: async (req: Request, res: Response): Promise<Response> => {
    const data = JSON.parse(req.body.data)
    const employeeId = parseInt(req.params.id)

    const { empCode, name, email, departmentId, role, designation, birthDate, reportingUser, contactNo, address } = data

    if (!(empCode && name && email && departmentId && role && designation && birthDate && reportingUser && contactNo && address)) {
      return res.status(400).json({
        status: false,
        msg: "all fields are required"
      })
    }

    const findEmployee = await prisma.employee.findUnique({
      where: {
        email
      }
    });

    if (!findEmployee) {
      return res.status(400).json({
        status: false,
        msg: "employee not exist"
      })
    }

    const findDepartment = await prisma.department.findUnique({
      where: {
        id: departmentId
      }
    })

    if (!findDepartment) {
      return res.status(400).json({
        status: false,
        msg: "invalid department"
      })
    }

    if (!req.file) {
      return res.status(400).json({
        status: false,
        msg: "please upload profile image"
      })
    }
    const uploadedImage = await uploadImage(req.file!.path)

    const updateEmployee = await prisma.employee.update({
      where: {
        id: employeeId
      },
      data: {
        empCode,
        name,
        profileImage: uploadedImage.secure_url,
        email,
        departmentId,
        role,
        designation,
        birthDate: stringToDate(birthDate),
        reportingUser,
        contactNo,
        address
      }
    })

    return res.status(200).json({
      status: true,
      msg: "Employee updated successfully",
      data: { updateEmployee }
    })

  },
  deleteEmployee: async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)

    const findEmployee = await prisma.employee.findUnique({
      where: {
        id
      }
    })

    if(!findEmployee){
      return res.status(400).json({
        status:false,
        msg:"employee not exist"
      })
    }

    const deleteEmployee = await prisma.employee.delete({
      where:{
        id
      }
    })

    const deleteUser = await prisma.user.delete({
      where:{
        email:deleteEmployee.email
      }
    })

    return res.status(200).json({
      status:true,
      msg:"employee deleted successfully"
    })

  },
  getAllEmployee: async (req: Request, res: Response): Promise<void> => {
    const employees = await prisma.employee.findMany()

    res.status(200).json({
      status:true,
      msg:"Employees details",
      data:{employees}
    })
  },
  getEmployee: async (req: Request, res: Response): Promise<Response|void> => {
    const id = parseInt(req.params.id)

    const findEmployee = await prisma.employee.findUnique({
      where:{
        id
      }
    })
    if(!findEmployee){
      return res.status(400).json({
        status:false,
        msg:"employee is not exist"
      })
    }
    
    return res.status(200).json({
      status:true,
      msg:"user details",
      data:{
        findEmployee
      }
    })
  },
}