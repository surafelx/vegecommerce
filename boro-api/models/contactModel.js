const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Contact Schema
const ContactSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  default: { type: Boolean, required: true },
  number: { type: String, required: true },
});

module.exports = mongoose.model("Contact", ContactSchema);
