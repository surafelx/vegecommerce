const mongoose = require("mongoose");

// Define the schema for Image and Gallery
const ImageSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  original: { type: String, required: true },
});

const GallerySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  original: { type: String, required: true },
});

// Define the schema for Tag
const TagSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
});

// Define the schema for Attribute Values
const AttributeValueSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  attribute_id: { type: Number, required: true },
  value: { type: String, required: true },
});

// Define the schema for Attribute
const AttributeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  slug: { type: String, required: true },
  name: { type: String, required: true },
  values: [AttributeValueSchema],
});

// Define the schema for Variations
const VariationSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  attribute_id: { type: Number, required: true },
  value: { type: String, required: true },
  attribute: AttributeSchema,
});

// Define the schema for Variation Options
const VariationOptionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  sale_price: { type: Number, default: null },
  quantity: { type: Number, required: true },
  is_disable: { type: Boolean, default: false },
  sku: { type: String, required: true },
  options: [
    {
      name: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
});

// Define the schema for Product
const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  image: ImageSchema,
  gallery: [GallerySchema],
  quantity: { type: Number, required: true },
  price: { type: Number, default: null },
  sale_price: { type: Number, default: null },
  unit: { type: String, required: true },
  tag: [TagSchema],
  product_type: { type: String, required: true },
  max_price: { type: Number, required: true },
  min_price: { type: Number, required: true },
  variations: [VariationSchema],
  variation_options: [VariationOptionSchema],
});

// Create the model
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
