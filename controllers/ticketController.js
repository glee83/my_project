const Ticket = require('../models/ticket');
const express = require('express');
const { ticketValidation } = require('../controllers/users');
const router = express.Router();

router.post('/add', async (req, res) =>{

    const { error } = ticketValidation(req.body);

    if(error){
        return res.status(400).send(error.details[0].message)
    }

    let tickets = new Ticket({
        name: req.body.name,
        idCard: req.body.idCard,
        phone: req.body.phone,
        email: req.body.email,
        seat: req.body.seat,
        date: req.body.date
    })

    try{
        const ticket = await tickets.save();

        res.status(200).send(ticket)
    } catch(error){
        res.status(501).send(error)
    }
})

router.get('/get', (req, res) =>{
    Ticket.find((err, data) =>{
        if(!err){
            res.status(200).send(data)
        }else {
            console.log(`sorry something went wrong: ` + JSON.stringify(err, undefined, 2));
        }
    })
})


module.exports = router