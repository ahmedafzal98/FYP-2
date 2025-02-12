const express = require("express");

const multer = require("multer");
const {
  addArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
} = require("../controller/ArticleController");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", getAllArticles);
router.get("/:id", getArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);
router.post("/", upload.single("image"), addArticle);

module.exports = router;
