const express = require("express");
var router = express.Router();

const {
  create,
  categoryById,
  read,
  deleteCategory,
  updateCategory,
  list
} = require("../controllers/category");
const { Auth, isAdmin, isAuth } = require("../controllers/user");
const { userById } = require("../controllers/userById");

// Add all validation later
router.get("/category/:categoryId", isAuth, read);
router.post("/category/create/:id", isAuth, create);
router.put("/category/:categoryId/:id", isAuth, updateCategory);
router.delete("/category/:categoryId/:id", isAuth, deleteCategory);
router.get("/categories/all", list);

router.param("categoryId", categoryById);
router.param("id", userById);

module.exports = router;
