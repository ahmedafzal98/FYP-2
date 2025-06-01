import { useEffect, useState } from "react";
import { FaPlayCircle, FaStopCircle } from "react-icons/fa";
import TextToSpeech from "../../../Hooks/TextToSpeech";
import { BookmarkMinus, Ellipsis } from "lucide-react";
import { MdOutlineDelete } from "react-icons/md";
import Seperator from "../../../components/Sepeartor";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const ArticleCard = ({ articleData, index, onDelete }) => {
  const [language, setLanguage] = useState("en");
  const [translatedTitle, setTranslatedTitle] = useState(articleData.title);
  const [translatedSummary, setTranslatedSummary] = useState(
    articleData.summary
  );
  const { isSpeaking, speak } = TextToSpeech();
  const { user } = useSelector((state) => state.auth);

  //Translation_work
  useEffect(() => {
    const translate = async (text, toLang) => {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=en|${toLang}`
      );
      const data = await res.json();
      return data?.responseData?.translatedText || text;
    };

    if (language === "en") {
      setTranslatedTitle(articleData.title);
      setTranslatedSummary(articleData.summary);
    } else {
      translate(articleData.title, language).then(setTranslatedTitle);
      translate(articleData.summary, language).then(setTranslatedSummary);
    }
  }, [language, articleData]);
  //Translation_work

  //Save_Article:
  const handleSaveArticle = async () => {
    if (!user) {
      console.log("User not logged in");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/watchlater`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            articleId: articleData._id,
            userId: user._id,
          }),
        }
      );

      if (res.status === 201) {
        console.log("Article saved to Watch Later!");
      } else if (res.status === 409) {
        console.log("Already saved.");
      } else {
        const err = await res.json();
        console.error("Unexpected error:", err.message || "Unknown error");
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };
  //Save_Article:

  return (
    <section className="flex items-center w-full ml-6 mt-6">
      <div className="w-1/2">
        {/* Author Info */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 cursor-pointer hover:opacity-50 ">
            <img
              src={articleData.authorImageUrl}
              alt="Author"
              className="rounded-full"
            />
          </div>
          <span className="text-black dark:text-white cursor-pointer hover:underline">
            {articleData.author}
          </span>
        </div>

        {/* Language Dropdown */}
        <div className="mt-3 mb-3">
          <select
            className="p-1 border rounded text-sm"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="ur">Urdu</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        {/* Title & Summary */}
        <div className="w-full flex flex-wrap cursor-pointer mt-2">
          <Link
            to={`/articleDetail/${articleData._id}`}
            state={{ index }}
            className="flex flex-col gap-3"
          >
            <span
              className="text-black dark:text-white font-bold text-2xl leading-tight"
              dangerouslySetInnerHTML={{ __html: translatedTitle }}
            ></span>

            <span
              className="text-base text-[#6B6B6B] dark:text-white"
              dangerouslySetInnerHTML={{ __html: translatedSummary }}
            ></span>
          </Link>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 w-1/2 mt-3 mb-3">
          {/* TTS Button */}
          <button
            className="text-black dark:text-white"
            onClick={() => speak(translatedSummary)}
          >
            {isSpeaking ? (
              <FaStopCircle size={24} />
            ) : (
              <FaPlayCircle size={24} />
            )}
          </button>

          {/* Conditional Save/Delete Button */}
          {onDelete ? (
            <button onClick={() => onDelete(articleData._id)}>
              <MdOutlineDelete className="hover:text-red-500 w-7 h-7" />
              {/* <BookmarkMinus
                className="text-red-500"
                strokeWidth={1}
                title="Remove from Watch Later"
              /> */}
            </button>
          ) : (
            <button onClick={handleSaveArticle}>
              <BookmarkMinus
                className="text-black dark:text-white"
                strokeWidth={1}
                title="Save for Later"
              />
            </button>
          )}

          {/* Ellipsis Menu */}
          <Ellipsis className="text-black dark:text-white" strokeWidth={1} />
        </div>

        <Seperator />
      </div>

      {/* Article Image */}
      {articleData.imageUrl && (
        <Link to={`/articleDetail/${articleData._id}`}>
          <div className="w-40 h-36 rounded-xl overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-105">
            <img
              src={articleData.imageUrl}
              alt="Article"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      )}
    </section>
  );
};

export default ArticleCard;
