
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
const rp = require('request-promise');
const functions = require("firebase-functions");

//firebase functions:config:set conf.webhookurl="https://hooks.slack.com/services/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"

exports.handler = (req, resp) => {

    cors(req, resp, () => {

        if (req.method === 'PUT' || req.method === 'PUT' || req.method === 'PUT') {
            return resp.status(403).send('Forbidden');
        }

        if (req.query.idinvoice === undefined ||
            req.query.idinvoice === '' ||
            req.query.idinvoice === null) {

            return resp.status(500).send('Parametros Incorrectos');

        }

        const idinvoice = req.query.idinvoice;

        console.log(`IdFactura = ${idinvoice}`);

        admin.database().ref(`facturas/${idinvoice}/total`).once("value").then(respDetInvoice => {

            return rp({
                method: 'POST',
                uri: functions.config().conf.webhookurl,
                body: {
                    text: respDetInvoice.val()
                },
                json: true
            });

            /*let totalInvoice = 0;
            console.log(respDetInvoice);
            respDetInvoice.forEach(element => {
                console.log("entro");
                console.log(element);
            });
            let data = {
                total: totalInvoice
            };
            let updates = {};
            updates[`/facturas/${idinvoice}`] = data;
            admin.database().ref().update(updates);*/

            return resp.status(200).json({ resp: true });;

        }).catch(error => {
            console.error(error);
            return resp.status(500).json({ 'error': error });
        });


    });

};
