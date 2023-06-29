const mongoose = require('../db/conn')
const { Schema } = mongoose

const Product = mongoose.model(
    'Product',
    new Schema({
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        available: {
            type: Boolean
        },
        User: Object,
        buyer: Object

    }, { timestamps: true },
    )
)
module.exports = Product