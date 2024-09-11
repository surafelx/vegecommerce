const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Brand Schema
const BrandSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true }
});

module.exports = mongoose.model('Brand', BrandSchema);
