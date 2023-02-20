import { Request, Response } from "express";

export const holidayController = {
  addHoliday: async (req: Request, res: Response): Promise<void> => {
    // Todo:check that user is super admin then check all detail and save to database
    res.end()
  },
  updateHoliday: async (req: Request, res: Response): Promise<void> => {
    //Todo: check that user is super admin then check all detail and update and save to database
  },
  deleteHoliday: async (req: Request, res: Response): Promise<void> => {
    //Todo:check Holiday is exist in database and the delete it
  },
  getAllHoliday:async (req: Request, res: Response): Promise<void> => {
    //Todo:get all Holiday
  },
  getHoliday:async (req: Request, res: Response): Promise<void> => {
    //Todo:get Holiday by req.params.id check in database 
  },
}