const express = require("express");
const router = express.Router();
const { getCategories, addCategory, editCategory, deleteCategory } = require("../controllers/categoriesController");
const {authMiddleware, adminMiddleware} = require("../middleware/authMiddleware")

router.get("/", getCategories);
router.post("/", authMiddleware, adminMiddleware, addCategory);
router.put("/:id",  editCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
