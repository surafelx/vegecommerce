const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  image: {
    thumbnail: { type: String, required: true },
    original: { type: String, required: true },
  },
  icon: { type: String, required: true },
  children: [
    {
      name: { type: String, required: true },
      slug: { type: String, required: true },
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
