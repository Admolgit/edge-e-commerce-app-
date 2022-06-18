const express = require("express");
var router = express.Router();

const { Auth, isAdmin, isAuth } = require("../controllers/user");
const {
  createProduct,
  productById,
  read,
  deleteProduct,
  updatedProduct,
} = require("../controllers/product");
const { userById } = require("../controllers/userById");

router.get("/product/:productId", read);
router.post("/product/create/:id", createProduct);
router.delete("/product/:productId/:id", deleteProduct);
router.delete("/product/:productId/:id", updatedProduct);

router.param("id", userById);
router.param("productId", productById);

module.exports = router;
