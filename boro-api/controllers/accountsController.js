const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.getAccounts = async (req, res) => {
  try {
    const categories = await User.find({});
    res.json({
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching categories",
      error: error.message,
    });
  }
};

exports.editAccount = async (req, res) => {
  const { id } = req.params;
  const {  email, password, role } = req.body;

  try {
    const updatedProduct = await User.findByIdAndUpdate(
      id,
      { email, password, role},
      { new: true, runValidators: true }
    );


    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the product by ID
    const deletedProduct = await User.findByIdAndDelete(id);

    if (!deletedProduct) {
      // If no product is found with the given ID
      return res.status(404).json({ message: "Product not found" });
    }

    // Respond with a success message
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.addAccount = async (req, res) => {
console.log(req.body)
  const { email, role, password} = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newProduct = new User({
      email,  password: hashedPassword, role,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};