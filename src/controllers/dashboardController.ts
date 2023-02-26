import { Request, Response } from 'express';
import { prisma } from '../config/dbConnection';

export const dashboardController = {
  dashboard: async (req: Request, res: Response) => {
    const employeeId = parseInt(req.params.id)

    const findEmployee = await prisma.employee.findUnique({
      where: {
        id: employeeId
      }
    })

    if (!findEmployee) {
      return res.status(404).json({
        status: false,
        msg: "invalid data"
      })
    }

    const findDepartment = await prisma.department.findUnique({
      where: {
        id: findEmployee.departmentId!
      }
    })

    const findLeaveMaster = await prisma.leaveMaster.findUnique({
      where: {
        employeeId
      }
    })

    const findLeave = await prisma.leave.findMany({
      where: {
        employeeId
      }
    })

    return res.status(200).json({
      status: true,
      msg: "employee data",
      data: {
        findEmployee,
        department: findDepartment?.deptName,
        remainingLeaves: findLeaveMaster?.leaveBalance,
        findLeave
      }
    })
  }
}