const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
    },
    tags: {
      type: [String],
      validate: {
        validator: function (value) {
          // Ensure that there are at least 2 tags in the array
          return Array.isArray(value) && value.length >= 2;
        },
        message: "You must provide at least 2 tags",
      },
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
    },
    authorImageUrl: {
      type: String,
      // Optional image, so no need to make it required
      // required: [true, "Image is required"],
    },
  },
  {
    timestamps: true,
  }
);

const articles = mongoose.model("Article", ArticleSchema);
module.exports = articles;
