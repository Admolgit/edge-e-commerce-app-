const express = require('express');
const { userSignupInputValidator }  = require("../Auth/inputValidator");
const { signup, signin, signout, Auth } = require("../controllers/user");

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.get('/test', Auth, (req, res) => {
  res.send("Hello World");
});

module.exports = router;
