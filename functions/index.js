const functions = require("firebase-functions/v2");
const { server } = require("./functions");

exports.nextjs = functions.https.onRequest(server);
