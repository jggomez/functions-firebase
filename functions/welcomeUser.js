
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

//firebase functions:config:set config.email="hola@devhack.co" config.password=""
const user = functions.config().config.email;
const password = functions.config().config.password;

const mailTransport = nodemailer.createTransport({
    host: "server3.hostingfacil.co",
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: password
    }
});

exports.handler = (event) => {

    const user = event.data;
    const email = user.email;

    console.log(`Usuario nuevo ${email}`);

    const mailOptions = {
        from: 'info@devfestlima.com',
        to: email
    };

    admin.database().ref(`users/${user.uid}`).set({
        email: email,
        name: email,
        profile: 1,
        token : "AD858er858ee55d85"
    });

    mailOptions.subject = "Bienvenida Devfest Lima 2017";
    mailOptions.text = "Gracias por registrarte al portal del devfest lima 2017";

    return mailTransport.sendMail(mailOptions).then(() => {
        console.log("Correo enviado");
    }).catch(error => {
        console.error(error);
    });

}