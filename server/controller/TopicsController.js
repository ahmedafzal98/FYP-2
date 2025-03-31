const Topics = require("../model/UserModel");

const addTopics = async (req, res) => {
  try {
    const { id, topics } = req.body;
    const user = await Topics.findByIdAndUpdate(id, { topics }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ msg: "Topics Added Successfully", user });
    console.log(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = addTopics;
