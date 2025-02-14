const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

// require("./config/Passport")(passport);

const ArticleRouter = require("./router/ArticleRouter");
const AuthRouter = require("./router/AuthRouter");

const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/articles", ArticleRouter);
app.use("/api/auth", AuthRouter);

const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_DB_STRING)
  .then(() => {
    console.log("Database Connected");
    app.listen(port, () => console.log(`Server is Running on port ${port}`));
  })
  .catch(() => console.log("Failed To Connect Database"));
