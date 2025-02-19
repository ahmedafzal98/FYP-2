var admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = require("./serviceAccountKey.json");
console.log("Private Key:", serviceAccount.private_key);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
