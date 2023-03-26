const functions = require("firebase-functions/v2");
const { server } = require("./functions");

// Server-side code
const admin = require('firebase-admin');

admin.initializeApp();

exports.createCustomToken = functions.https.onCall(async (data, context) => {
  const ethAddress = data.ethAddress;

  if (!ethAddress) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Ethereum address must be provided'
    );
  }

  const customToken = await admin.auth().createCustomToken(ethAddress);
  return { customToken };
});


exports.nextjs = functions.https.onRequest(server);
