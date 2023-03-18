const admin = require("firebase-admin");
const functions = require("firebase-functions");
const next = require("next");
const config = require("./next.config.js");


admin.initializeApp();

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
