const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Address Schema
const AddressSchema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  formatted_address: { type: String, required: true },
});

// Location Schema
const LocationSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  default: { type: Boolean, required: true, default: false },
  address: { type: AddressSchema, required: true },
});

module.exports = mongoose.model("Location", LocationSchema);
