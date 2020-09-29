const Joi = require('joi');
const { responseMessages } = require("../helpers/responseMessages");
const { body,validationResult } = require("express-validator");

Joi.objectId=require('joi-objectid')(Joi)

const registerValidation = data =>{
    const schema=Joi.object({
        firstName:Joi.string().required().trim().min(1)
            .withMessage(responseMessages.firstName.noEspecificado)
            .isAlphanumeric().withMessage(responseMessages.firstName.noAlfanumerico),
            
        lastName:Joi.string().required().trim().min(1),
        email:Joi.string().required().trim().email().min(1),
        password:Joi.string().required().trim().min(6)
    });
    return schema.validate(data);
};

module.exports.registerValidation=registerValidation;