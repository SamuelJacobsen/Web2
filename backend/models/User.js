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
        }
    }, {timestamps: true},
    )
)
module.exports = User