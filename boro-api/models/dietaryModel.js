const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Dietary Schema
const DietarySchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true }
});

module.exports = mongoose.model('Dietary', DietarySchema);
