const express = require('express');
var router = express.Router();

// const { userSignupInputValidator }  = require("../Auth/inputValidator");
const { Auth, isAdmin, isAuth, getUsers } = require("../controllers/user")

const { userById, read, update } = require("../controllers/userById");

router.get('/:id', (req, res, next) => {
  res.json({
    user: req.profile,
  })
});
router.get("/user/:id", isAuth, isAdmin, read)
router.put("/user/:id", update)
router.get('/users/all', isAuth, isAdmin, getUsers)

router.param("id", userById);

module.exports = router;