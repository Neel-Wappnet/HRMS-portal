import { Request, Response } from "express";
import { prisma } from '../config/dbConnection';

export const departmentController = {

  addDepartment: async (req: Request, res: Response): Promise<Response> => {

    const { deptName } = req.body
    const findDepartment = await prisma.department.findUnique({
      where: {
        deptName
      }
    })

    if (!findDepartment) {
      const department = await prisma.department.create({
        data: {
          deptName
        }
      })
      return res.status(201).json({
        status: true,
        msg: "department created",
        data: { department }
      })
    } else {
      return res.status(223).json({
        status: false,
        msg: "Department already exist"
      })
    }
  },

  updateDepartment: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const { deptName } = req.body

    const findDepartment = await prisma.department.findUnique({
      where: {
        id:parseInt(id)
      }
    })

    if (!findDepartment) {
      return res.status(404).json({
        status: false,
        msg: "department is not existed"
      })
    } else {
      await prisma.department.update({
        where: {
          id: parseInt(id)
        },
        data: {
          deptName
        }
      })
      return res.status(200).json({
        status:true,
        msg:"department updated successfully"
      })
    }
  },

  deleteDepartment: async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    const findDepartment = await prisma.department.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    if (!findDepartment) {
      return res.status(404).json({
        status: false,
        msg: "department is not existed"
      })
    } else {
      await prisma.department.delete({
        where:{
          id:id as unknown as number
        }
      })
      return res.status(200).json({
        status:true,
        msg:"department deleted successfully"
      })
    }

  },

  getAllDepartment: async (req: Request, res: Response): Promise<Response> => {

    const users = await prisma.department.findMany()
    return res.status(200).json({
      status:true,
      msg:"all departments",
      data:{
        users
      }
    })

  },
  
  getDepartment: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const findDepartment = await prisma.department.findUnique({
      where: {
        id: id as unknown as number
      }
    })

    if (!findDepartment) {
      return res.status(404).json({
        status: false,
        msg: "department is not existed"
      })
    } else {
      return res.status(200).json({
        status:true,
        msg:"department info",
        data:{
          findDepartment
        }
      })
    }
  },
}