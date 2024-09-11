const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Values Schema
const ValueSchema = new Schema({
  id: { type: Number, required: true },
  value: { type: String, required: true },
});

// Attributes Schema
const AttributeSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  values: { type: [ValueSchema], required: true },
});

module.exports = mongoose.model("Attribute", AttributeSchema);
