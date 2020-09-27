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
// Mensajes de error
const { errorMessages } = require("../helpers/errorMessages");



exports.register = [
	// Validación de los parametros
	body("firstName").isLength({ min: 1 }).trim().withMessage(errorMessages.firstName.noEspecificado)
		.isAlphanumeric().withMessage(errorMessages.firstName.noAlfanumerico),
	
	body("lastName").isLength({ min: 1 }).trim().withMessage(errorMessages.lastName.noEspecificado)
		.isAlphanumeric().withMessage(errorMessages.lastName.noAlfanumerico),

	body("email").isLength({ min: 1 }).trim().withMessage(errorMessages.email.noEspecificado)
		.isEmail().withMessage(errorMessages.email.direccionInvalida).custom((value) => {
			return UserModel.findOne({email : value}).then((user) => {
				if (user) {
					return Promise.reject(errorMessages.email.enUso);
				}
			});
		}),
	body("password").isLength({ min: 6 }).trim().withMessage(errorMessages.password.corta),
    
    // Limpiar campos
	check("firstName").escape(),
	check("lastName").escape(),
	check("email").escape(),
    check("password").escape(),
    
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


exports.login=[
	body("email").isLength({min:1}).trim().withMessage(errorMessages.email.noEspecificado)
		.isEmail().withMessage(errorMessages.email.direccionInvalida),

	body("password").isLength({min:1}).trim().withMessage(errorMessages.password.noEspecificado),

	check("email").escape(),
	check("password").escape(),

	(req,res)=>{
		try {
			const errors = validationResult(req);
			if(!errors.isEmpty()){
				return apiResponse.validationErrorWithData(res,"Error de validacion",errors.array());
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
											return apiResponse.unauthorizedResponse(res,errorMessages.account.inactiva,userData);
										}
									}else{
										return apiResponse.unauthorizedResponse(res,errorMessages.account.noConfirmada,userData);
									}
								}else{
									return apiResponse.unauthorizedResponse(res,errorMessages.account.credencialesIncorrectas,userData);
								}
							});
						}else{
							// Si el user no existe
							return apiResponse.ErrorResponse(res,errorMessages.account.credencialesIncorrectas,userData);
						}
					});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res,err)
		}
	}
];