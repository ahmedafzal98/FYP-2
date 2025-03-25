const UserModel = require("../model/UserModel");

const googleAuth = async (req, res) => {
  const { uid, name, email, photoUrl } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(200).json({ user, msg: "User already " });
    } else {
      const newUser = await UserModel.create({ uid, name, email, photoUrl });
      await newUser.save();
      res
        .status(200)
        .json({ user: newUser, msg: "User LoggedIn Successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = googleAuth;
