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
        validator: (value) => {
          return value.length >= 5;
        },
        message: "You must provide atleast 5 tags",
      },
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  {
    timestamps: true,
  }
);

const articles = mongoose.model("Article", ArticleSchema);
module.exports = articles;
