const { log } = require("console");
const admin = require("firebase-admin");
const path = require("path");
require("dotenv").config();

const serviceAccount = JSON.parse(
  Buffer.from(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64,
    "base64"
  ).toString("utf8")
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
