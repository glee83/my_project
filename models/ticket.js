const { timestamp } = require('joi/lib/types/date');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ticket = new Schema({
    name:{
        type: String,
        required: true
    },
    idCard:{
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    seat:{
        type: Number,
        required: Boolean,
    },

    date:{
        type: Date
    }
}, {timestamp: true})

const passenTicket = mongoose.model('ticket', ticket);

module.exports = passenTicket;