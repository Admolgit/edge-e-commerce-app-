const express = require("express");
var router = express.Router();

const {
  create,
  categoryById,
  read,
  deleteProduct,
  updateProduct,
  list
} = require("../controllers/category");
const { Auth, isAdmin, isAuth } = require("../controllers/user");
const { userById } = require("../controllers/userById");

// Add all validation later
router.get("/category/:id", read);
router.post("/category/create/:id", isAuth, create);
router.put("/category/:categoryId/:id", isAuth, updateProduct);
router.delete("/category/:categoryId/:id", isAuth, deleteProduct);
router.get("/categories", list);

router.param("categoryId", categoryById);
router.param("id", userById);

module.exports = router;
