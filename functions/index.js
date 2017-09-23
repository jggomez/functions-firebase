
//
// Juan Guillermo Gómez
// DevHack
// 2017
//

const welcomeUser = require("./welcomeUser");
const deleteUser = require("./deleteUser");
const invoice = require("./invoice");
const invoiceCalculation = require("./invoiceCalculation");

const admin = require("firebase-admin");
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

exports.welcomeUser = functions.auth.user().onCreate(welcomeUser.handler);
exports.deleteUser = functions.auth.user().onDelete(deleteUser.handler);
exports.invoiceTotal = functions.database.ref("facturas/{id}/total").onWrite(invoice.handler);
exports.invoiceCalculation = functions.https.onRequest(invoiceCalculation.handler);