const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");

const {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} = require("../controllers/productsController");

router.get("/", getProducts);
router.post("/", upload, addProduct);
router.put("/:id", upload, editProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
