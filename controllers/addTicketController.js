const addTicket = require('../models/addTicket');
const express = require('express');
const { addTicketValidation } = require('../controllers/users');
const router = express.Router();

router.post('/addTicket', async (req, res) =>{

    const { error } = addTicketValidation(req.body);

    if(error){
        return res.status(400).send(error.details[0].message)
    }

    let addTickets = new addTicket({
        departure: req.body.departure,
        destination: req.body.destination,
        departure_time: req.body.departure_time,
        bus_type: req.body.bus_type,
        amount: req.body.amount,
        plate_num: req.body.plate_num,
        seat: req.body.seat,
        date: req.body.date
    })

    try{
        const ticket = await addTickets.save();

        res.status(200).send(ticket)
    } catch(error){
        res.status(501).send(error)
    }
})

router.get('/getTicket', (req, res) =>{
    addTicket.find((err, data) =>{
        if(!err){
            res.status(200).send(data)
        }else {
            console.log(`sorry something went wrong: ` + JSON.stringify(err, undefined, 2));
        }
    })
})


module.exports = router