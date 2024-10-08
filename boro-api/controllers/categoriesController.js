const Category = require("../models/categoryModel");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
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

exports.editCategory = async (req, res) => {
  const { id } = req.params;
  const { name, } = req.body;

  try {
    const updatedProduct = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );


    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the product by ID
    const deletedProduct = await Category.findByIdAndDelete(id);

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


exports.addCategory = async (req, res) => {
console.log(req.body)
  const { name} = req.body;
  try {
    const newProduct = new Category({
      name,
      
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};