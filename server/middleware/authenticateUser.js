const jwt = require("jsonwebtoken");
const User = require("../model/UserModel"); // adjust based on your path

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key";

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token found. Unauthorized." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user; // Attach user to request object
    next(); // Call next middleware or route
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticateUser;
