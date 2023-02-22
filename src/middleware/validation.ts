import { NextFunction, Request, Response } from 'express';

export const validation = {
  superAdmin: (req: Request, res: Response, next: NextFunction) => {

    const { user } = req.body

    if (user.id !== 1) {
      return res.status(403).json({
        status: false,
        msg: "you have not permission"
      })
    } else {
      next()
    }
  }
}