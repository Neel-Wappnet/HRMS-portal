import { Request, Response } from "express";

export const employeeController = {
  addEmployee: async (req: Request, res: Response): Promise<void> => {
    // Todo:check that user is super admin then check all detail and save to database
  },
  updateEmployee: async (req: Request, res: Response): Promise<void> => {
    //Todo: check that user is super admin then check all detail and update and save to database
  },
  deleteEmployee: async (req: Request, res: Response): Promise<void> => {
    //Todo:check employee is exist in database and the delete it
  },
  getAllEmployee:async (req: Request, res: Response): Promise<void> => {
    //Todo:get all employee
  },
  getEmployee:async (req: Request, res: Response): Promise<void> => {
    //Todo:get employee by req.params.id check in database 
  },
}