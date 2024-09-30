const express = require("express");
const router = express.Router();
const { login, register } = require("./controllers/authController");
const categoriesRoutes = require("./routes/categoriesRoutes");
const productsRoutes = require("./routes/productsRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const paymentsRoutes = require("./routes/paymentsRoutes");
const searchRoutes = require("./routes/searchRoutes");
const contactRoutes = require("./routes/contactRoutes");
const brandsRoutes = require("./routes/brandsRoutes");
const dietaryRoutes = require("./routes/dietaryRoutes");
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");

// Define routes
router.use("/account", accountRoutes);
router.use("/auth", authRoutes);
router.use("/login", login);
router.use("/register", register);
router.use("/categories", categoriesRoutes);
router.use("/product", productsRoutes);
router.use("/dietary", dietaryRoutes);
router.use("/brands", brandsRoutes);
router.use("/orders", ordersRoutes);
router.use("/paymentsRoutes", paymentsRoutes);
router.use("/products", productsRoutes);
router.use("/address", productsRoutes);
router.use("/contact", productsRoutes);
router.use("/search", productsRoutes);

module.exports = router;
