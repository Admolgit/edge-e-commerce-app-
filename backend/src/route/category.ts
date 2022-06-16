import express from "express";
var router = express.Router();

import { create } from "../controllers/category";
import { Auth, isAdmin, isAuth } from "../controllers/user";
import { userById } from "../controllers/userById";

router.post("/category/create/:id", Auth, isAdmin, isAdmin, create);

router.param("id", userById);

export default router;
