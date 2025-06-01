const express = require("express");
const router = express.Router();
const WatchLater = require("../model/WatchLater");

const authenticateUser = require("../middleware/authenticateUser");

// ✅ POST: Save article to Watch Later
router.post("/", async (req, res) => {
  const { articleId } = req.body;

  try {
    const exists = await WatchLater.findOne({
      userId: req.user.id,
      articleId,
    });

    if (exists) return res.status(409).json({ message: "Already saved." });

    const saved = new WatchLater({
      userId: req.user.id,
      articleId,
    });

    await saved.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const articles = await WatchLater.find({ userId: req.user.id }).populate(
      "articleId"
    );
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.delete("/:articleId", async (req, res) => {
//   try {
//     await WatchLater.findOneAndDelete({
//       userId: req.user.id,
//       articleId: req.params.articleId,
//     });
//     res.json({ message: "Removed from watch later." });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.delete("/:watchLaterId", async (req, res) => {
  try {
    await WatchLater.findByIdAndDelete(req.params.watchLaterId);
    res.json({ message: "Removed from watch later." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
