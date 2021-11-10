const Ticket = require('../models/ticket');
const express = require('express');
const router = express.Router()


router.post( '/',(req, res, next) =>{
    let tickets = new Ticket({
        passengerName: req.body.passengerName,
        nidCard: req.body.nidCard,
        phone: req.body.phone,
        email: req.body.email,
        seat: req.body.seat,
        busNumber: req.body.busNumber,
        currentDate: req.body.date
    })

    tickets.save().then(message => {
        res.json({
            message: "thanks for using our service"
        }).catch(err => {
            if(err){

                res.json({
                    message: 'sorry please something went wron'
                })
            }
        })
    })
})

module.exports = router