const UserModel = require("../models/UserModel");
const { body,validationResult } = require("express-validator");
const { check } = require("express-validator");
// Helpers para respuestas
const apiResponse = require("../helpers/apiResponse");

const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");

const {loginValidation,registerValidation} = require("../validation/auth");
// Mensajes de error
const { responseMessages } = require("../helpers/responseMessages");



/**
 * Registro de User.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.register = [
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address.").custom((value) => {
			return UserModel.findOne({email : value}).then((user) => {
				if (user) {
					return Promise.reject("E-mail already in use");
				}
			});
		}),
   
    // Limpiar campos
	check("firstName").escape(),
	check("lastName").escape(),
	check("email").escape(),
    check("password").escape(),
    
	// Procesamiento de la petición despues de validar y limpiar los campos
	(req, res) => {
		try {
			const validar = registerValidation(req.body);
			const validarEmail = validationResult(req);
			// console.log(JSON.stringify(validarEmail))					;
			
			if((typeof validar.error !== 'undefined' && validar.error.details) || !validarEmail.isEmpty()) {
				if(!validarEmail.isEmpty()){
					return apiResponse.validationErrorWithData(res, "Error de validacion.", validarEmail.errors);
				}else{
					return apiResponse.validationErrorWithData(res, "Error de validacion.", validar.error.details);
				}
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
			return apiResponse.ErrorResponse(res, err);
		}
}];



/**
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.login=[

	check("email").escape(),
	check("password").escape(),

	(req,res)=>{
		try {
			const validar = loginValidation(req.body);
			if(typeof validar.error !== 'undefined' && validar.error.details){
				return apiResponse.validationErrorWithData(res, "Error de validacion.", validar.error.details);
			}else {
				UserModel.findOne({email : req.body.email}).then(user => {
					if (user) {
							bcrypt.compare(req.body.password,user.password,function (err,same) {
								if(same){
									// verifica si la cuenta esta confirmada (email)🙏🏾
									if(user.isConfirmed){
										// Verifica si la cuenta esta activa
										if(user.status) {
											let userData = {
												_id: user._id,
												firstName: user.firstName,
												lastName: user.lastName,
												email: user.email,
											};

											// Preparacion para auth con JWT
											const jwtPayload = userData;
											const jwtData = {
												expiresIn: process.env.JWT_TIMEOUT_DURATION,
											};
											const secret = process.env.JWT_SECRET;

											// Crea el Token con el Payload y el secrect
											userData.token=jwt.sign(jwtPayload,secret,jwtData);
											return apiResponse.successResponseWithData(res,"Login Exitoso.",userData);
										}else{
											return apiResponse.unauthorizedResponse(res,responseMessages.account.inactiva,userData);
										}
									}else{
										return apiResponse.unauthorizedResponse(res,responseMessages.account.noConfirmada);
									}
								}else{
									return apiResponse.unauthorizedResponse(res,responseMessages.account.credencialesIncorrectas,userData);
								}
							});
						}else{
							// Si el user no existe
							return apiResponse.ErrorResponse(res,responseMessages.account.credencialesIncorrectas,userData);
						}
					});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res,err)
		}
	}
];


/**
 * Verifica el codigo otp.
 *
 * @param {string}      email
 * @param {string}      otp
 *
 * @returns {Object}
 */
exports.verifyConfirm = [
	body("email").isLength({ min: 1 }).trim().withMessage(responseMessages.email.noEspecificado)
		.isEmail().withMessage(responseMessages.email.direccionInvalida),
	body("otp").isLength({ min: 1 }).trim().withMessage(responseMessages.otp.noEspecificado),

	check("email").escape(),
	check("otp").escape(),

	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Error de validacion.", errors.array());
			}else {
				var query = {email : req.body.email};
				UserModel.findOne(query).then(user => {
					if (user) {
						if(!user.isConfirmed){
							if(user.confirmOTP == req.body.otp){
								UserModel.findOneAndUpdate(query, {
									isConfirmed: 1,
									confirmOTP: null 
								}).catch(err => {
									return apiResponse.ErrorResponse(res, err);
								});
								return apiResponse.successResponse(res,responseMessages.otp.confirmar);
							}else{
								return apiResponse.unauthorizedResponse(res,responseMessages.otp.noCoincide);
							}
						}else{
							return apiResponse.unauthorizedResponse(res,responseMessages.otp.confirmado);
						}
					}else{
						return apiResponse.unauthorizedResponse(res, responseMessages.email.noEncontrado);
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
	}
}];

/**
 * Reenviar codigo OTP
 *
 * @param {string}      email
 *
 * @returns {Object}
 */

exports.resendConfirmOtp=[
	body("email").isLength({min:1}).trim().withMessage(responseMessages.email.noEspecificado)
		.isEmail().withMessage(responseMessages.email.direccionInvalida),
	check("email").escape(),
	(req,res)=>{
		try {
			const errors=validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res,"Error de validacion.",errors.array());
			} else {
				var query={email:req.body.email};
				UserModel.findOne(query).then(user=>{
					if(user){
						if(!user.isConfirmed){
							let otp = utility.randomNumber(4);
							let html = "<p>Por favor verifique su cuenta</p><p>OTP: "+otp+"</p>";
							mailer.send(
								constants.confirmEmails.from,
								req.body.email,
								"Confirmar cuenta",
								html
							).then(function(){
								user.isConfirmed=0;
								user.confirmOTP=otp;

								user.save(function(err){
									if(err){return apiResponse.ErrorResponse(res,err);}
									return apiResponse.successResponse(res,responseMessages.otp.enviado);
								});
							});
						}else{
							return apiResponse.unauthorizedResponse(res,responseMessages.otp.confirmado);
						}
					}else{
						return apiResponse.unauthorizedResponse(res,responseMessages.email.noEncontrado);
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res,err);
		}
	}
];