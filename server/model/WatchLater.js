const mongoose = require("mongoose");

const watchLaterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WatchLater", watchLaterSchema);
