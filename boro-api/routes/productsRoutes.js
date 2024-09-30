const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");
const {authMiddleware, adminMiddleware} = require("../middleware/authMiddleware")
const {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} = require("../controllers/productsController");

router.get("/all", getProducts);
router.post("/", authMiddleware, adminMiddleware, upload, addProduct);
router.put("/:id", upload, editProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
