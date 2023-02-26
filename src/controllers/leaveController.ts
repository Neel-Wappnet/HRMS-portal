import { Request, Response } from "express";
import { dateFormation, dateDifferance } from '../middleware/dateTranformation';
import { prisma } from '../config/dbConnection';

export const leaveController = {
  addLeave: async (req: Request, res: Response): Promise<Response> => {
    console.log(req.body)
    const { subject, startDate, endDate, leaveReason, user } = req.body

    const start = dateFormation(startDate)
    const end = dateFormation(endDate)

    if (new Date(start).getTime() < new Date().getTime()) {
      return res.status(400).json({
        status: false,
        msg: "invalid start date"
      })
    } else if (new Date(end).getTime() < new Date().getTime()) {
      return res.status(400).json({
        status: false,
        msg: "invalid end date"
      })
    } else if (new Date(end).getTime() < new Date(start).getTime()) {
      return res.status(400).json({
        status: false,
        msg: "invalid dates"
      })
    }

    const findleaves = await prisma.leave.findMany({
      where: {
        subject,
        startDate: start,
        endDate: end
      }
    })

    const leaves = findleaves.filter(l => l.subject.toUpperCase() === subject.toUpperCase() && new Date(l.startDate).getFullYear() === new Date().getFullYear())
    console.log(leaves)

    const findEmployee = await prisma.employee.findUnique({
      where: {
        email: user.email
      }
    })

    if (!findEmployee) {
      return res.status(404).json({
        status: false,
        msg: "employee is not found"
      })
    }

    if (leaves.length) {
      return res.status(223).json({
        status: false,
        msg: "leave already exist"
      })
    }

    const createLeave = await prisma.leave.create({
      data: {
        employeeId: findEmployee.id,
        subject,
        startDate: start,
        endDate: end,
        leaveReason
      }
    })

    const findLeaveMaster = await prisma.leaveMaster.findUnique({
      where: {
        employeeId: findEmployee.id
      }
    })
    // console.log(12 - dateDifferance(start, end))


    if (!findLeaveMaster) {
      const leaveBalance = 12 - dateDifferance(start, end)
      const createLeaveMaster = await prisma.leaveMaster.create({
        data: {
          employeeId: findEmployee.id,
          leaveBalance
        }
      })
    } else {
      const leaveBalance = findLeaveMaster.leaveBalance - dateDifferance(start, end)
      const updateLeaveMaster = await prisma.leaveMaster.update({
        where: {
          employeeId: findEmployee.id
        },
        data: {
          leaveBalance
        }
      })
    }

    return res.status(201).json({
      status: true,
      msg: "leave added successfully",
      data: { createLeave }
    })
  },

  updateLeave: async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)
    const { subject, startDate, endDate, approved, leaveReason } = req.body

    const start = dateFormation(startDate)
    const end = dateFormation(endDate)

    if (new Date(start).getTime() < new Date().getTime()) {
      return res.status(400).json({
        status: false,
        msg: "invalid start date"
      })
    } else if (new Date(end).getTime() < new Date().getTime()) {
      return res.status(400).json({
        status: false,
        msg: "invalid end date"
      })
    } else if (new Date(end).getTime() < new Date(start).getTime()) {
      return res.status(400).json({
        status: false,
        msg: "invalid dates"
      })
    }

    const findLeave = await prisma.leave.findUnique({
      where: {
        id
      }
    })

    if (!findLeave) {
      return res.status(404).json({
        status: false,
        msg: "leave is not found"
      })
    }

    const updateLeave = await prisma.leave.update({
      where: {
        id
      },
      data: {
        subject,
        startDate: start,
        endDate: end,
        approved,
        leaveReason
      }
    })

    const findLeaveMaster = await prisma.leaveMaster.findUnique({
      where: {
        employeeId: updateLeave.employeeId!
      }
    })

    if (!findLeaveMaster) {
      return res.status(404).json({
        status: false,
        msg: "leave master is not found"
      })
    }

    const updateLeaveMaster = await prisma.leaveMaster.update({
      where: {
        employeeId: findLeaveMaster.id
      },
      data: {
        leaveBalance: findLeaveMaster.leaveBalance + dateDifferance(findLeave.startDate, findLeave.endDate) - dateDifferance(start, end)
      }
    })


    return res.status(200).json({
      status: true,
      msg: "leave has been updated",
      data: { updateLeave }
    })
  },

  deleteLeave: async (req: Request, res: Response): Promise<Response | void> => {
    const id = parseInt(req.params.id)

    const findLeave = await prisma.leave.findUnique({
      where: {
        id
      }
    })

    if (!findLeave) {
      return res.status(404).json({
        status: false,
        msg: "leave is not found"
      })
    }

    const findLeaveMaster = await prisma.leaveMaster.findUnique({
      where: {
        employeeId: findLeave.employeeId!
      }
    })

    if (!findLeaveMaster) {
      return res.status(404).json({
        status: false,
        msg: "leave master is not found"
      })
    }



    const deleteLeave = await prisma.leave.delete({
      where: {
        id
      }
    })

    const updateLeaveMaster = await prisma.leaveMaster.update({
      where: {
        employeeId: findLeaveMaster.id
      },
      data: {
        leaveBalance: findLeaveMaster.leaveBalance + dateDifferance(findLeave.startDate, findLeave.endDate)
      }
    })

    return res.status(204).json({
      status: true,
      msg: "leave deleted successfully",
      data: { deleteLeave }
    })
  },

  getAllLeave: async (req: Request, res: Response): Promise<Response> => {
    const leaves = await prisma.leave.findMany()

    return res.status(200).json({
      status: true,
      msg: "all leaves",
      data: { leaves }
    })
  },

  getLeave: async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)

    const findLeave = await prisma.leave.findUnique({
      where: {
        id
      }
    })

    if (!findLeave) {
      return res.status(404).json({
        status: false,
        msg: "leave is not found"
      })
    }

    return res.status(200).json({
      status: true,
      msg: "leave data",
      data: { findLeave }
    })
  },
}