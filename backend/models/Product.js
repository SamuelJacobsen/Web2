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
        User: {
            //alteração para salvar somente o id do usuario 
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        buyer: Object

    }, { timestamps: true },
    )
)
module.exports = Product