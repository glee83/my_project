const express = require('express')
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const password = require('passport');
const dotenv = require('dotenv')
const verifyUser = require('../routes/verifyUser')
const contactController = require('../controllers/contactUs');
const {registerValidation, loginValidation} = require('../controllers/users');
const ticketRoute = require('../controllers/ticketController')


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
    }); try {
        const saveUser = await user.save();
        return res.status(201).json(saveUser)
    } catch (err){
        return res.status(501).json(err);
    }
    
});

router.post('/login',  async (req, res)=>{

    //validate user's data 

    const { error } = loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function(err) {
          if (err) { return res.status(501).json(err); }
          return res.status(200).j;
        });
    })(req, res, next);

    // check if the email exists

    // const user = await User.findOne({email: req.body.email});
    // if(!user){
    //     return res.status(400).send('Email didnt match')
    // }
    
    // compare password

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
        return res.status(400).send('Invalid password');
    }

    // assign a token 

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
    // res.send('Logged In!')
});

module.exports = router;


