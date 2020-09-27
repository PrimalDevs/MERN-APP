exports.responseMessages = {
    // User Model
    firstName:{
        noEspecificado:"El nombre debe ser especificado.",
        noAlfanumerico:"El nombre tiene caracteres no alfanumericos.",
    },
    lastName:{
        noEspecificado:"El apellido debe ser especificado.",
        noAlfanumerico:"El apellido tiene caracteres no alfanumericos.",
    },
    email: {
        noEspecificado:"El email debe ser especificado.",
        direccionInvalida: "El email debe ser una dirección valida de email.",
        enUso: "El email ya esta en uso",
        noEncontrado:"El email especificado no fue encontrado",
    },
    password:{
        corta:"La contraseña debe tener mas de 6 caracteres.",
    },
    otp:{
        enviado:"Codigo de confirmacion enviado.",
        confirmar:"La cuenta ha sido confirmada exitosamente.",
        confirmado:"La cuenta ya estaba confirmada.",
        noCoincide:"El codigo OTP no coincide, compruebe su codigo.",
        noEspecificado:"El codigo OTP debe ser especificado.",
    },

    // Auth Controller
    account:{
        inactiva:"Su cuenta esta inactiva, por favor contacte a un administrador.",
        noConfirmada:"Su cuenta no, esta confirmada, por favor confirme su cuenta.",
        credencialesIncorrectas:"Su correo o contraseña son incorrectos",
    }
};