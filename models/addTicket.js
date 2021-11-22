const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addTicket = new Schema({
    departure: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    departure_time: {
        type: String,
        required: true
    },
    bus_type: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    plate_num: {
        type: String,
        required: true
    },
    seat: {
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    }
}, {timestamps: true})

const add_ticket = mongoose.model('add_ticket', addTicket)

module.exports = add_ticket;