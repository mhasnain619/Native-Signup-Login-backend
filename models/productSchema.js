// models/Product.js

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['men\'s clothing', 'women\'s clothing', 'jewelery', 'electronics', 'other']
    }
});

const productModel = mongoose.model('Product', productSchema);
export default productModel;
