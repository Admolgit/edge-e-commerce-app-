import express from "express";
var router = express.Router();

import { signup, signin, signout, Auth }  from "../controllers/user";

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.get('/test', Auth, (req, res) => {
  res.send("Hello World");
});

export default router;
