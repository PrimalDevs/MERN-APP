const UserModel = require("../models/UserModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
// Helpers para respuestas
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");


exports.register = [
	// Validación de los parametros
	body("firstName").isLength({ min: 1 }).trim().withMessage("El nombre debe ser especificado.")
		.isAlphanumeric().withMessage("El nombre tiene caracteres no alfanumericos."),
	body("lastName").isLength({ min: 1 }).trim().withMessage("El apellido debe de ser especificado.")
		.isAlphanumeric().withMessage("El apellido tiene caracteres no alfanumericos."),
	body("email").isLength({ min: 1 }).trim().withMessage("El email debe ser especificado.")
		.isEmail().withMessage("El email debe ser una dirección valida de email.").custom((value) => {
			return UserModel.findOne({email : value}).then((user) => {
				if (user) {
					return Promise.reject("El email ya esta en uso");
				}
			});
		}),
	body("password").isLength({ min: 6 }).trim().withMessage("La contraseña debe tener mas de 6 caracteres."),
    
    // Limpiar campos
	sanitizeBody("firstName").escape(),
	sanitizeBody("lastName").escape(),
	sanitizeBody("email").escape(),
    sanitizeBody("password").escape(),
    
	// Procesamiento de la petición despues de validar y limpiar los campos
	(req, res) => {
		try {
			// EExtra los errores de validacion de la peticion
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// Muestra los mensajes de error
				return apiResponse.validationErrorWithData(res, "Error de validacion.", errors.array());
			}else {
				//Encripta la contraseña
				bcrypt.hash(req.body.password,10,function(err, hash) {
                    let otp = utility.randomNumber(4);
                    
					// Create User object with escaped and trimmed data
					var user = new UserModel(
						{
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							email: req.body.email,
							password: hash,
							confirmOTP: otp
						}
					);
                    
                    // Correo de verificacion de la cuenta
					let html = "<p>Por favor verifique su cuenta.</p><p>OTP: "+otp+"</p>";
					// Envia la notificacion
					mailer.send(
						constants.confirmEmails.from, 
						req.body.email,
						"Confirmar cuenta",
						html
					).then(function(){
						// Guarda el usuario
						user.save(function (err) {
							if (err) { return apiResponse.ErrorResponse(res, err); }
							let userData = {
								_id: user._id,
								firstName: user.firstName,
								lastName: user.lastName,
                                email: user.email,
							};
							return apiResponse.successResponseWithData(res,"Registro exitoso.", userData);
						});
					}).catch(err => {
						console.log(err);
						return apiResponse.ErrorResponse(res,err);
					}) ;
				});
			}
		} catch (err) {
			// Retorna un JSON con status 500
			return apiResponse.ErrorResponse(res, err);
		}
	}];
