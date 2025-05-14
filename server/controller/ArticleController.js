const Article = require("../model/ArticleModel");
const axios = require("axios");

const generateAIContent = async (topic) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `You are an expert blog writer. Given a topic, generate:

1. A catchy and relevant **title**.
2. A well-written, engaging article (around 300–500 words) on the same topic.

Return the output in the following format:

Title: <your generated title here>

Content:
<your generated blog content here>

Topic: ${topic}

`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPEN_AI_API}`,
        },
      }
    );

    const aiContent = response.data.choices[0].message.content;
    return aiContent;
  } catch (err) {
    console.log(`Error generating ai Content: ${err.message}`);

    throw new Error(`Error generating ai Content: ${err.message}`);
  }
};

const parseAIResponse = (responseText) => {
  const titleMatch = responseText.match(/Title:\s*(.*)/);
  const contentMatch = responseText.match(/Content:\s*([\s\S]*)/);

  const title = titleMatch ? titleMatch[1].trim() : "";
  const content = contentMatch ? contentMatch[1].trim() : "";

  return { title, content };
};

const AIContentCreation = async (req, res) => {
  try {
    const { aiTopic } = req.body;
    if (!aiTopic) {
      return res.status(400).json({ message: "Mention the Topic.." });
    }
    const aiContent = await generateAIContent(aiTopic);
    const AIResponse = parseAIResponse(aiContent);
    const { title, content } = AIResponse;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Can not get the content of this topic.." });
    }
    res
      .status(200)
      .json({ title, content, message: "AI Content created successfully" });
    console.log(aiContent);
  } catch (error) {
    console.error("Error adding article:", error);
    res.status(500).json({ message: error.message });
  }
};

const generateSummary = async (content) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Summarize the following content in just 3 clear and concise lines. The summary should be easy to understand and suitable to display on a website. Start your response with: "Here’s a quick summary: ${content}
`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPEN_AI_API}`,
        },
      }
    );

    const summary = response.data.choices[0].message.content;
    return summary;
  } catch (err) {
    console.log(`Error generating summary: ${err.message}`);

    throw new Error(`Error generating summary: ${err.message}`);
  }
};

const addArticle = async (req, res) => {
  console.log(req.body);

  try {
    const { title, content, tags, author, authorImageUrl } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    if (!Array.isArray(tags) || tags.length < 2) {
      return res
        .status(400)
        .json({ message: "You must provide at least 2 tags" });
    }

    const summary = await generateSummary(content);

    const article = await Article.create({
      title,
      content,
      tags: tags.map((tag) => tag.label),
      summary,
      author,
      authorImageUrl,
    });

    res.status(200).json({
      message: "Article Added Successfully",
      article: article,
    });
  } catch (error) {
    console.error("Error adding article:", error);
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
    console.log(id);

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

const searchArticle = async (req, res) => {
  try {
    const query = req.query.q?.trim() || "";
    if (!query) {
      return res.status(200).json([]);
    }

    const result = await Article.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } },
        { author: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
  AIContentCreation,
  searchArticle,
};
