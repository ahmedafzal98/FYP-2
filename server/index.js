const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// require("./config/Passport")(passport);

const ArticleRouter = require("./router/ArticleRouter");
const watchLaterRouter = require("./router/WatchLaterRouter");
const AuthRouter = require("./router/AuthRouter");
const TopicsRouter = require("./router/TopicsRouter");
// const translationRoutes = require("./router/translationRoutes");
const authenticateUser = require("./middleware/authenticateUser");

const app = express();

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // ✅ allow cookies
  })
);
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/articles", authenticateUser, ArticleRouter);
app.use("/api/topics", TopicsRouter);
app.use("/api/auth", AuthRouter);
// app.use("/api/translate", translationRoutes);
app.use("/api/watchlater", authenticateUser, watchLaterRouter);

const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_DB_STRING)
  .then(() => {
    console.log("Database Connected");
    app.listen(port, () => console.log(`Server is Running on port ${port}`));
  })
  .catch(() => console.log("Failed To Connect Database"));
