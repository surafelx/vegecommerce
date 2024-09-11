const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Product Schema
const ProductSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: {
        id: { type: Number, required: true },
        thumbnail: { type: String, required: true }
    }
});

// Status Schema
const StatusSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    serial: { type: Number, required: true },
    color: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true }
});

// Shipping Address Schema
const ShippingAddressSchema = new Schema({
    street_address: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
});

// Order Schema
const OrderSchema = new Schema({
    tracking_number: { type: String, required: true },
    amount: { type: Number, required: true },
    total: { type: Number, required: true },
    delivery_fee: { type: Number, required: true },
    discount: { type: Number, required: true },
    status: { type: StatusSchema, required: true },
    delivery_time: { type: String, required: true },
    created_at: { type: Date, required: true },
    products: [ProductSchema],
    shipping_address: { type: ShippingAddressSchema, required: true }
});

module.exports = mongoose.model('Order', OrderSchema);
