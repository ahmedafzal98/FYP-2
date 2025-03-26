const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
const googleAuth = async (req, res) => {
  const { uid, name, email, photoUrl } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    const token = generateToken(user._id);
    if (user) {
      res.status(200).json({ user, msg: "User already ", token });
    } else {
      const newUser = await UserModel.create({ uid, name, email, photoUrl });
      await newUser.save();
      res
        .status(200)
        .json({ user: newUser, msg: "User LoggedIn Successfully", token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = googleAuth;
