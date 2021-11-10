const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerUsers = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    phone: {
        type: String,
        required: true,
        min: 9,
        max: 12
    },
    email: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        require: true, 
        min: 6,
        max: 1024
    }
}, {timestamps: true});

const RegisterUsers = mongoose.model('RegisterUser', registerUsers)

module.exports = RegisterUsers