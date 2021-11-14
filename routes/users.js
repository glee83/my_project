const express = require('express')
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv')
const {registerValidation, loginValidation} = require('../controllers/users');



dotenv.config();

router.post('/register', async(req,res) =>{
    const { error } = registerValidation(req.body)
    if(error){
        return res.status(404).send(error.details[0].message)
    }

    //check if user exits

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist){
        return res.status(400).send('Email already exist')
    }
    
    //HASHED PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    //creat new user 

    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPass
    });

    user.save((error, registeredUser) => {
        if(error){
            console.log(error)
        }else{
            let token = jwt.sign({_id: registeredUser._id}, process.env.TOKEN_SECRET);
             res.status(200).send(token);
        }
    })
    
});

router.post('/login',  async (req, res)=>{

    //validate user's data 

    const { error } = loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    // check if the email exists

    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send('Email didnt match')
    }
    
    // compare password

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
        return res.status(400).send('Invalid password');
    }

    // assign a token 

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.status(200).send(token)
    // res.send('Logged In!')
});

module.exports = router;


