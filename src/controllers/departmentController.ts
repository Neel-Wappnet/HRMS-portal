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
    const id = parseInt(req.params.id)
    const { deptName } = req.body

    const findDepartment = await prisma.department.findUnique({
      where: {
        id
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
          id
        },
        data: {
          deptName
        }
      })
      return res.status(200).json({
        status: true,
        msg: "department updated successfully"
      })
    }
  },

  deleteDepartment: async (req: Request, res: Response): Promise<Response> => {

    const id = parseInt(req.params.id)

    const findDepartment = await prisma.department.findUnique({
      where: {
        id
      }
    })

    if (!findDepartment) {
      return res.status(404).json({
        status: false,
        msg: "department is not existed"
      })
    } else {
      await prisma.department.delete({
        where: {
          id: id as unknown as number
        }
      })
      return res.status(200).json({
        status: true,
        msg: "department deleted successfully"
      })
    }

  },

  getAllDepartment: async (req: Request, res: Response): Promise<Response> => {

    const departments = await prisma.department.findMany()
    return res.status(200).json({
      status: true,
      msg: "all departments",
      data: {
        departments
      }
    })

  },

  getDepartment: async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)

    const findDepartment = await prisma.department.findUnique({
      where: {
        id
      }
    })

    if (!findDepartment) {
      return res.status(404).json({
        status: false,
        msg: "department is not existed"
      })
    } else {
      return res.status(200).json({
        status: true,
        msg: "department info",
        data: {
          findDepartment
        }
      })
    }
  },
}