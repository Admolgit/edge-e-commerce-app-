const express = require('express');
var router = express.Router();

// const { userSignupInputValidator }  = require("../Auth/inputValidator");
const { Auth, isAdmin, isAuth, } = require("../controllers/user")

const { userById } = require("../controllers/userById");

console.log("USERBYID1",userById);

router.get('/:id', (req, res, next) => {
  res.json({
    user: req.profile,
  })
});

router.param("id", userById);

module.exports = router;