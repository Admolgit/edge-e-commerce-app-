import { Request, Response, NextFunction } from 'express';
import User from "../models/user";

export const userById = (req: Request | any, res: Response, next: NextFunction, id: any) => {

  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    req.profile = user;

    next();
    
  });

};