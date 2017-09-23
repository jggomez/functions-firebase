
const admin = require("firebase-admin");

exports.handler = (event) => {

    console.log(event.data.val());

    const totalInvoice = event.data.val();

    const idInvoice = event.params.id;

    console.log(`Id Invoice = ${idInvoice}`);

    if (totalInvoice > 150) {

        console.log("Enviar promoción");

        admin.database().ref(`facturas/${idInvoice}`).once('value').then(resp => {

            const uid = resp.val().uid;

            admin.database().ref(`users/${uid}`).once('value').then(resp => {

                console.log(resp.val());
                const token = resp.val().token;

                //admin.messaging().sendToDevice(token, {}).then(resp =>;

            }).catch(error => {
                console.error(error);
            });


        }).catch(error => {
            console.error(error);
        });
    }

}