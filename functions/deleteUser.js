
const functions = require("firebase-functions");
const admin = require("firebase-admin");


exports.handler = (event) => {

    const uid = event.data.uid;
    admin.database().ref(`users/${uid}`).remove();

}


