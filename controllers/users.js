
const Joi = require('joi')

const registerValidation = data => {

    let userDetails = {
        name: Joi.string().min(6).required(),
        phone: Joi.number().min(9).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, userDetails)
};

const loginValidation = data => {

    let userDetails = {
        
        email: Joi.string().email().required(),
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

const ticketValidation = data =>{
    let ticket = {
        name: Joi.string().min(3).required(),
        idCard: Joi.number().min(9).required(),
        phone: Joi.number().min(9).required(),
        email: Joi.string().email().required(),
        seat: Joi.number().required(),
        date: Joi.string().required()
    };

    return Joi.validate(data, ticket);
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.contactUsValidation = contactUsValidation
module.exports.ticketValidation = ticketValidation


