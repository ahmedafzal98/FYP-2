const express = require("express");
const addTopics = require("../controller/TopicsController");

const router = express.Router();

router.post("/", addTopics);

module.exports = router;
