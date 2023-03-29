const express = require("express");
const router = express.Router();

const { Auth, isAdmin, isAuth } = require("../controllers/user");
const {
  createProduct,
  productById,
  read,
  deleteProduct,
  updatedProduct,
  list,
  relatedProducts,
  listCategories,
  listBySearch,
  productImage,
} = require("../controllers/product");
const { userById } = require("../controllers/userById");

router.get("/product/:productId", read);
router.post("/product/create/:id", createProduct);
router.delete("/product/:productId/:id", deleteProduct);
router.put("/product/:productId/:id", updatedProduct);
router.get("/products", list);
router.get("/products/related/:productId", relatedProducts)
router.get("/products/categories", listCategories);
router.get("/product/image/:productId", productImage)
router.post("/products/by/search", listBySearch);

router.param("id", userById);
router.param("productId", productById);

module.exports = router;