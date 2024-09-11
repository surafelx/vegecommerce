const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  categories: { type: String, required: true },
  tags: { type: String, required: true },
  image: { type: String }, // URL to the image file
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;