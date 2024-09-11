
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Image Schema for Cover Image and Logo
const ImageSchema = new Schema({
    id: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    original: { type: String, required: true }
});

// Shop Schema
const ShopSchema = new Schema({
    id: { type: Number, required: true },
    owner_id: { type: Number, required: true },
    owner_name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String },
    ratings: { type: String },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    cover_image: { type: ImageSchema, required: true },
    logo: { type: ImageSchema, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shop', ShopSchema);
