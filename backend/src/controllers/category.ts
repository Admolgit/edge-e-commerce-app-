import {  Request, Response, NextFunction } from 'express';
import Category from '../models/category'

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let category = new Category({ ...req.body });
    let categoryInfo = await category.save();
    res.status(201).json({
      categoryInfo
    });
  }
  catch (error) {
    res.status(400).json({
      error: "Not created",
    });
  }
}