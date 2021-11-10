
const Joi = require('joi')

const registerValidation = data => {

    let userDetails = {
        name: Joi.string().min(6).required(),
        phone: Joi.number().min(9).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, userDetails)
};

const loginValidation = data => {

    let userDetails = {
        
        name: Joi.string().required(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, userDetails)
}

const contactUsValidation = data => {
    let contactUser = {
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        phone: Joi.number().min(9).required(),
        email: Joi.string().email().required(),
        message: Joi.string().min(6).max(255).required()
    };

    return Joi.validate(data , contactUser)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.contactUsValidation = contactUsValidation

// let { error } =  Joi.validate(req.body, userDetails);
// if(error){
//     return res.status(404).send(error.details[0].message)
// }else{
//     return res.send('well done')
// }
// const register = (req, res, next) =>{

    
//     bcrypt.hash(req.body.password, 10, function(err, hashedPass){

//         if(err){
//             res.json({
//                 rerror: err
//             })
//         }

//         let user = new RegisterUser({
//             name: req.body.name,
//             email: req.body.email,
//             phone: req.body.phone,
//             password: hashedPass
//         });

//         user.save().then(user =>{
//             res.json({
//                 message: "user added successfully!"
//             })
//         }).catch(error =>{
//             res.json({
//                 message: "An error occured!"
//             })
//         })
//     }) 
// }

// const login = (req, res, next) =>{
//     let userName = req.body.userName;
//     let password = req.body.userPassword;

//     User.findOne({$or: [{email: userName}, {phone: userName}]})
//     .then(user =>{
//         if(user){
//             bcrypt.compare(password, user.password, (err, result)=>{
//                 if(err){
//                     res.json({error:err})
//                 }
//                 if(result){
//                     let token =jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: '1h'})
//                     res.json({message: 'Login successful',
//                         token
//                     })
//                 }else{
//                     res.json({
//                         message: 'invalid password'
//                     })
//                 }
//             })
//         }else{
//             res.json({
//                 message: 'No user found!'
//             })
//         }
//     })
// }

