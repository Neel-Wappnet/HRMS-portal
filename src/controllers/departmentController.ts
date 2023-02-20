import { Request, Response } from "express";

export const departmentController = {
  addDepartment: async (req: Request, res: Response): Promise<void> => {
    // Todo:check that user is super admin then check all detail and save to database
    res.end()
  },
  updateDepartment: async (req: Request, res: Response): Promise<void> => {
    //Todo: check that user is super admin then check all detail and update and save to database
  },
  deleteDepartment: async (req: Request, res: Response): Promise<void> => {
    //Todo:check Department is exist in database and the delete it
  },
  getAllDepartment:async (req: Request, res: Response): Promise<void> => {
    //Todo:get all Department
  },
  getDepartment:async (req: Request, res: Response): Promise<void> => {
    //Todo:get Department by req.params.id check in database 
  },
}