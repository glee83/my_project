const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ticket = new Schema({
    passengerName:{
        type: String,
        requiredPaths: true
    },
    nidCard:{
        type: Number,
        requiredPaths: true
    },
    phone: {
        type: Number,
        requiredPaths: true
    },
    email: {
        type: String,
        requiredPaths: true
    },
    seat:{
        type: Number,
        required: Boolean,
    },

    busNumber:{
        type: String,
        require: true
    },
    currentDate:{
        type: Date
    }
})

const passenTicket = mongoose.model('ticket', ticket);

module.exports = passenTicket;