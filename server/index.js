const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const ArticleRouter = require("./router/ArticleRouter");

const app = express();

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/articles", ArticleRouter);

const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_DB_STRING)
  .then(() => {
    console.log("Database Connected");
    app.listen(port, () => console.log(`Server is Running on port ${port}`));
  })
  .catch(() => console.log("Failed To Connect Database"));
