import nodemailer from "nodemailer";

// crea un objeto de transporte reutilizable usando SMTP
let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: process.env.EMAIL_SMTP_PORT,
    // secure: process.env.EMAIL_SMTP_SECURE,
    auth:{
        user: process.env.EMAIL_SMTP_USERNAME,
        pass: process.env.EMAIL_SMTP_PASSWORD
    }
});

exports.send=function (from,to,subject,html){
//    envia email
//     https://nodemailer.com/ para más opciones/documentacion
    return transporter.sendMail({
        from: from, // Dirección de envio e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
        to: to, // Listado de clientes e.g. bar@example.com, baz@example.com
        subject: subject, // Asunto e.g. 'Hello ✔'
        //text: text, // plain text body e.g. Hello world?
        html: html // html body e.g. '<b>Hello world?</b>'
    })
}