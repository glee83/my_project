const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactUsSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },

    phone: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,   
    },
    message: {
        type: String,
        require: true,
        max: 255
    }
}, {timestamps: true})

const ContactUs = mongoose.model('ContactUs', contactUsSchema);
module.exports = ContactUs;