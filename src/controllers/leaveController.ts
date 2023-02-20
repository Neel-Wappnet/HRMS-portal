import { Request, Response } from "express";

export const leaveController = {
  addLeave: async (req: Request, res: Response): Promise<void> => {
    // Todo:check that user is super admin then check all detail and save to database
    res.end()
  },
  updateLeave: async (req: Request, res: Response): Promise<void> => {
    //Todo: check that user is super admin then check all detail and update and save to database
  },
  deleteLeave: async (req: Request, res: Response): Promise<void> => {
    //Todo:check Leave is exist in database and the delete it
  },
  getAllLeave: async (req: Request, res: Response): Promise<void> => {
    //Todo:get all Leave
  },
  getLeave: async (req: Request, res: Response): Promise<void> => {
    //Todo:get Leave by req.params.id check in database 
  },
}