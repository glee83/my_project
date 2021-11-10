const ContactUs = require('../models/contactUs');
const contactUsValidation = require('../controllers/users').contactUsValidation;
const express = require('express');
const router = express.Router();

router.get('/list', (req, res) =>{
    ContactUs.find((err, docs) =>{
        if(!err){
            res.status(201).send(docs);
        }else{
            console.log(`sorry something went wrong: ` + JSON.stringify(err, undefined, 2));
        }
    })
})

router.post('/add', async(req, res, next) =>{

    const { error } = contactUsValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    let contactUs = new ContactUs({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        message: req.body.message
    });

    try{
        const user = await contactUs.save();
        
        res.send(user)
    } catch(err){
        res.status(400).send(err)
    }

})

module.exports = router;