const axios = require("axios");

const translateText = async (req, res, next) => {
  try {
    const { q, from, to } = req.query;

    if (!q || !from || !to) {
      const error = new Error("Missing query parameters: q, from, to");
      error.statusCode = 400;
      throw error;
    }

    const CHUNK_SIZE = 500;

    // Break the input into 500 character chunks
    const chunks = [];
    for (let i = 0; i < q.length; i += CHUNK_SIZE) {
      chunks.push(q.slice(i, i + CHUNK_SIZE));
    }

    const translatedChunks = [];

    for (const chunk of chunks) {
      const response = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            q: chunk,
            langpair: `${from}|${to}`,
          },
        }
      );

      const translated = response.data.responseData.translatedText;
      translatedChunks.push(translated);
    }

    const fullTranslation = translatedChunks.join(" ");

    res.json({
      success: true,
      translatedText: fullTranslation,
      totalChunks: chunks.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { translateText };
