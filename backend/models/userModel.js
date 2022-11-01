const mongoose = require('mongoose')

// exporting schema for input fields/data required using mongoose.Schema method.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
}, 
    {
        timestamps: true,
    })

// exports a mongoose model, the title of the model, and the userSchema object.
module.exports = mongoose.model('User', userSchema)