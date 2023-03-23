const admin = require("firebase-admin");
const functions = require("firebase-functions");
//const functions = require('firebase-functions/v2');
const next = require("next");
const config = require("./next.config.js");
// import from a specific subpackage
//const {onRequest} = require('firebase-functions/v2/https');


admin.initializeApp();

//exports.getCustomToken = functions.https.onCall(async (data, context) => {
//  const { ethereumAddress, signature } = data;
//  const message = `Sign this message to authenticate with your Ethereum address ${ethereumAddress}`;
//
//  // Verify the signature using the Ethereum address
// we will need a web3 provider for this probably alchemy
//  const web3 = new Web3(/* Your provider URL here */);
//  const recoveredAddress = await web3.eth.personal.ecRecover(message, signature);
//
//  if (recoveredAddress.toLowerCase() === ethereumAddress.toLowerCase()) {
//    // Generate a custom Firebase token using the Ethereum address as the UID
//    const customToken = await admin.auth().createCustomToken(ethereumAddress);
//    return { customToken };
//  } else {
//    throw new functions.https.HttpsError('unauthenticated', 'Invalid signature');
//  }
//});



const app = next({
	// the absolute directory from the package.json file that initialises this module
	// IE: the absolute path from the root of the Cloud Function
	conf: config,
});
const handle = app.getRequestHandler();

const server = functions
.runWith({
  minInstances: 1,
  maxInstances: 3,
  timeoutSeconds: 300,
  memory: "1GB",
})
.https.onRequest((request, response) => {
	// log the page.js file or resource being requested
	return app.prepare().then(() => handle(request, response));
});

exports.nextjs = { server };
