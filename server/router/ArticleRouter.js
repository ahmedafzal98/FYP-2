const express = require("express");

const multer = require("multer");
const {
  addArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
  AIContentCreation,
  searchArticle,
} = require("../controller/ArticleController");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", getAllArticles);
router.get("/search", searchArticle);
router.get("/:id", getArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);
// router.post("/", upload.single("image"), addArticle);
router.post("/", addArticle);
router.post("/generateContent", AIContentCreation);

module.exports = router;
