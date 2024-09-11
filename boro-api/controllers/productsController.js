const Product = require("../models/productModel");
const { upload } = require("../middleware/upload");

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the product by ID
    const deletedProduct = await Product.findByIdAndDelete(id);

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

exports.editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, quantity, price, categories, tags } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, quantity, price, categories, tags, image },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addProduct = async (req, res) => {
  const { name, quantity, price, description, categories, tags } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const newProduct = new Product({
      name,
      quantity,
      price,
      description,
      categories,
      tags,
      image, // Store the path to the image
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    // console.log("Products");
    const products = await Product.find({});
    res.json({
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};
