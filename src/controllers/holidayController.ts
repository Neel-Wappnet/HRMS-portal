import { Request, Response } from "express";
import { prisma } from "../config/dbConnection";
import { dateFormation } from '../middleware/dateTranformation';


export const holidayController = {


  addHoliday: async (req: Request, res: Response): Promise<Response> => {
    const { title, startDate, endDate, isOptional, status } = req.body

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

    const findHoliday = await prisma.holiday.findMany({
      where: {
        title,
        startDate:start,
        endDate:end
      }
    })

    const holidays = findHoliday.filter(h => h.startDate.getFullYear() === new Date().getFullYear() && h.title.toLocaleLowerCase() == title.toLocaleLowerCase())

    if (holidays.length) {
      return res.status(223).json({
        status: false,
        msg: "holiday already exist"
      })
    }

    if (status !== "enabled" && status !== "disabled") {
      return res.status(400).json({
        status: false,
        msg: "status is either enabled or disbabled"
      })
    }

    const createHoliday = await prisma.holiday.create({
      data: {
        title,
        startDate,
        endDate,
        isOptional,
        status
      }
    })

    return res.status(201).json({
      status: true,
      msg: "holiday added successfully",
      data: { createHoliday }
    })

  },

  updateHoliday: async (req: Request, res: Response): Promise<Response> => {
    let { title, startDate, endDate, isOptional, status } = req.body
    const id = parseInt(req.params.id)

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

    const findHoliday = await prisma.holiday.findMany({
      where: {
        id
      }
    })

    if (!findHoliday) {
      return res.status(404).json({
        status: false,
        msg: "holiday not exist"
      })
    }

    const updateHoliday = await prisma.holiday.update({
      where: {
        id
      },
      data: {
        title,
        startDate:start,
        endDate:end,
        isOptional,
        status
      }
    })

    return res.status(200).json({
      status: true,
      msg: "holiday updated",
      data: { updateHoliday }
    })
  },
  
  deleteHoliday: async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)

    const findHoliday = await prisma.holiday.findUnique({
      where: {
        id
      }
    })

    if (!findHoliday) {
      return res.status(404).json({
        status: false,
        msg: "holiday not found"
      })
    }

    const deleteHoliday = await prisma.holiday.delete({
      where: {
        id
      }
    })

    return res.status(200).json({
      status: true,
      msg: "holiday deleted successfully",
      data: { deleteHoliday }
    })
  },

  getAllHoliday: async (req: Request, res: Response): Promise<void> => {
    const holidays = await prisma.holiday.findMany()

    res.status(200).json({
      status: true,
      msg: "Holidays details",
      data: { holidays }
    })
  },

  getHoliday: async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)

    const findHoliday = await prisma.holiday.findUnique({
      where: {
        id
      }
    })

    if (!findHoliday) {
      return res.status(404).json({
        status: false,
        msg: "holiday not found"
      })
    }

    return res.status(200).json({
      status: true,
      msg: "Holiday details",
      data: { findHoliday }
    })
  },
}