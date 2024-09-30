const express = require("express");
const router = express.Router();
const User = require("../models/userModel"); // Assuming your model is in the 'models' folder
const {
  // addProduct,
  // deleteProduct,
  // editProduct,
  getAccounts,
  addAccount,
  editAccount,
  deleteAccount
} = require("../controllers/accountsController");

router.get("/all", getAccounts);
router.post("/",  addAccount);
router.put("/:id",  editAccount);
router.delete("/:id", deleteAccount);
// GET user details without password
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password"); // Exclude the password field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Send user data without password
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
