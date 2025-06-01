const express = require("express");
const jwt = require("jsonwebtoken");
const admin = require("../firebase/firebaseConfig"); // From Step 4
const router = express.Router();
const User = require("../model/UserModel");
const authenticateUser = require("../middleware/authenticateUser");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { token } = req.body; // Firebase token from frontend

  try {
    // Step 1: Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);

    const { uid, email, name, picture } = decodedToken;

    // Step 2: You can fetch/add additional data from your DB here if needed

    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, email, name, picture, isFirstLogin: true });
      await user.save();
    } else if (user.isFirstLogin) {
      user.isFirstLogin = false;
      await user.save();
    }
    // Step 3: Create your own JWT (includes extra fields if needed)
    const customToken = jwt.sign(
      {
        id: user._id,
        firebaseUID: user.uid,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", customToken, {
      httpOnly: true,
      secure: false, // true only in production
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Step 4: Send it to frontend
    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        photo: user.photoUrl,
        uid: user.uid,
        isFirstLogin: user.isFirstLogin,
      },
    });
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.json({ message: "Logged out successfully" });
});

router.get("/validate-token", authenticateUser, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
