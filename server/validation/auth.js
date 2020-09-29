const Joi = require('joi');
const { responseMessages } = require("../helpers/responseMessages");
const { body,validationResult } = require("express-validator");

Joi.objectId=require('joi-objectid')(Joi)

//  Documentación https://github.com/sideway/joi/blob/master/API.md#list-of-errors
const registerValidation = data =>{
    const schema=Joi.object({
        firstName:Joi.string().required().trim().min(1).max(100)
        .messages({
            "string.base": `"firstName" firstName debe de ser de tipo 'String'.`,
            "string.empty": `"firstName" no puede ser un campo vacio.`,
            "string.min": `"firstName" debe de tener un largo minimo de {#limit}`,
            "string.max": `"firstName" debe de tener un largo maximo de {#limit}`,
            "any.required": `"firstName" es un campo requerido`
          }),       
        lastName:Joi.string().required().trim().min(1).max(100)
        .messages({
            "string.base": `"lastName" debe de ser de tipo 'String'.`,
            "string.empty": `"lastName" no puede ser un campo vacio.`,
            "string.min": `"lastName" debe de tener un largo minimo de {#limit}`,
            "string.max": `"lastName" debe de tener un largo maximo de {#limit}`,
            "any.required": `"lastName" es un campo requerido`
          }),
        email:Joi.string().required().trim().email().min(1).max(100)
        //TODO
        // validar si el email es unico
        .messages({
            "string.base": `"email" debe de ser de tipo 'Email'.`,
            "string.empty": `"email" no puede ser un campo vacio.`,
            "string.min": `"email" debe de tener un largo minimo de {#limit}`,
            "string.max": `"email" debe de tener un largo maximo de {#limit}`,
            "any.required": `"email" es un campo requerido`
          }),
        password:Joi.string().required().trim().min(6).max(100)
        .messages({
            "string.base": `"password" debe de ser de tipo 'String'.`,
            "string.empty": `"password" no puede ser un campo vacio.`,
            "string.min": `"password" debe de tener un largo minimo de {#limit}`,
            "string.max": `"password" debe de tener un largo maximo de {#limit}`,
            "any.required": `"password" es un campo requerido`
          })
    });
    return schema.validate(data);
};

module.exports.registerValidation=registerValidation;