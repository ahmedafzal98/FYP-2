const express = require("express");
const passport = require("passport");
const bycrypt = require("bcryptjs");
const router = express.Router();
// const admin = require("../config/firebase-config");
const UserModel = require("../model/UserModel");
const googleAuth = require("../controller/AuthController");

// router.post("/", async (req, res) => {
//   const { token, userData } = req.body;
//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     const user = await UserModel.create(userData);
//     res.status(200).json({ message: "User Successfully LoggedIn", user: user });
//     console.log(decodedToken);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

router.post("/google", googleAuth);

module.exports = router;
