import express, { Request, Response, NextFunction } from "express";
var router = express.Router();

import { Auth, isAdmin, isAuth }  from "../controllers/user";
// import { create }  from "../controllers/product";

import { userById }  from "../controllers/userById";

console.log("USERBYID1",userById);

router.get('/:id', Auth, isAuth, isAdmin, (req: Request | any, res: Response, next: NextFunction) => {
  res.json({
    user: req.profile,
  })
});

router.param("id", userById);

export default router;