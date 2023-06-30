const mongoose = require('../db/conn')
const {Schema} = mongoose

const User = mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        adm: {
            type: Boolean,
            required: true
        },
        acesso:{
            type: Number,
            required: true,
            default: 0
        }
    }, {timestamps: true},
    )
)
module.exports = User