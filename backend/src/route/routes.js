const express = require('express');
var router = express.Router();
const { userSignupInputValidator }  = require("../Auth/inputValidator");
const { signup, signin, signout, Auth } = require("../controllers/user");

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.get('/test', Auth, (req, res) => {
  res.send("Hello World");
});

module.exports = router;
