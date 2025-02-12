const Article = require("../model/ArticleModel");

const addArticle = async (req, res) => {
  try {
    const articleData = {
      ...req.body,
      image: `/uploads/${req.file.filename}`,
    };
    const article = await Article.create(articleData);
    res
      .status(200)
      .json({ message: "Article Added Successfully", article: article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Article Updated Successfully", article: article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Article Deleted Successfully", article: article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
};
