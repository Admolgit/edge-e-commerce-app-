const express = require('express');
var router = express.Router();

// const { userSignupInputValidator }  = require("../Auth/inputValidator");
const { Auth, isAdmin, isAuth } = require("../controllers/user")

const { userById, read, update } = require("../controllers/userById");

router.get('/:id', (req, res, next) => {
  res.json({
    user: req.profile,
  })
});
router.get("/user/:id", read)
router.put("/user/:id", update)

router.param("id", userById);

module.exports = router;