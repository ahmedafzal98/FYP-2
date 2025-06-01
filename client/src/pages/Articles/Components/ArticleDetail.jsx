import { BookmarkMinus } from "lucide-react";
import Seperator from "../../../components/Sepeartor";
import ActionButton from "../../../components/ActionButton";
import { useParams, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { Link } from "react-router";
import { FaPlayCircle, FaStopCircle } from "react-icons/fa";
import TextToSpeech from "../../../Hooks/TextToSpeech";

const ArticleDetail = () => {

  const { id } = useParams();
  const location = useLocation();
  const { index } = location.state || {};
  console.log("index", index);
  const [article, setArticle] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const { isSpeaking, speak } = TextToSpeech();

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/articles/${id}`,
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch article");
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error("Error loading article:", err);
      }
    };
    fetchArticleDetail();
  }, [id]);

  useEffect(() => {
    if (index !== undefined) {
      const payload = {
        article_index: index,
        top_n: 4,
      };

      console.log("Sending payload:", payload);

      fetch("https://fyp-2-backend.onrender.com/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("recommendation-data", data);
          setRecommendations(data.recommendations || []);
        })
        .catch((err) => {
          console.error("Failed to fetch recommendations:", err);
        });
    }
  }, [index]);

  if (!article) return <Loader />;

  return (
    <section className="md:w-[50%] w-[95%] mx-auto">
      {/* Article Description  */}
      <div className="flex flex-col">
        {/* Article_Title */}
        <span
          className="text-[#242424] text-5xl font-bold dark:text-white"
          dangerouslySetInnerHTML={{ __html: article.title }}
        ></span>
        {/* Article_Title */}
        <div className="flex flex-col mt-[3%]">
          <div className="flex items-center gap-3">
            {/* AuthorImg_AuthorName */}
            <div className="w-11 h-11 cursor-pointer hover:opacity-50 rounded-full mt-2">
              <img
                src={article.authorImageUrl}
                alt="Author Image"
                className="rounded-full"
              />
            </div>
            {/* AuthorImg_AuthorName */}
            <div className="flex w-full gap-4">
              <span
                className="text-base font-light text-[#242424] cursor-pointer hover:underline dark:text-white"
                dangerouslySetInnerHTML={{ __html: article.author }}
              ></span>
            </div>
          </div>
          {/* Voice_SaveArtcile */}
          <div className="gap-4 flex flex-col mt-[3%]">
            <Seperator />
            <div className="flex items-center gap-6">
              <button
                className="text-black dark:text-white"
                onClick={() => speak(article.content)}
              >
                {isSpeaking ? (
                  <FaStopCircle size={24} />
                ) : (
                  <FaPlayCircle size={24} />
                )}
              </button>
              <BookmarkMinus
                className="text-black dark:text-white"
                strokeWidth={1}
              />
            </div>
            <Seperator />
          </div>
          {/* Voice_SaveArtcile */}
        </div>
        <div className="mt-[5%] flex flex-col">
          {/* Artcile_Content */}
          <div className="mt-5">
            <span
              className="text-black text-[15px] sm:text-[16px] font-sans leading-normal dark:text-white"
              dangerouslySetInnerHTML={{ __html: article.content }}
            ></span>
          </div>
          {/* Artcile_Content */}

          <div className="w-full mt-[3%] flex gap-3 flex-wrap">
            {article.tags &&
              article.tags.map((tag, index) => {
                return (
                  <div
                    key={index}
                    className="h-9 rounded-2xl flex justify-center items-center border border-[#F2F2F2] bg-[#F2F2F2] p-3"
                  >
                    <span className="text-[#242424] text-base">{tag}</span>
                  </div>
                );
              })}
          </div>
          <div className="flex items-center w-full mt-4 justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 cursor-pointer hover:opacity-50 mt-2">
                <img
                  src={article.authorImageUrl}
                  alt="Author Image Url"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col items-center mt-3">
                <div className="flex w-full gap-4">
                  <span className="text-[#242424] font-normal ml-1 text-xl cursor-pointer hover:underline dark:text-white">
                    Written by
                    <span
                      className="ml-1"
                      dangerouslySetInnerHTML={{ __html: article.author }}
                    ></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Seperator />
        </div>
      </div>
      {/* Article Description  */}

      {/* RecommendationArtilces */}
      <div className="py-8">
        <h2 className="text-xl font-semibold mb-6 dark:text-white">
          Recommended from Smart News Hub
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((article, index) => (
            <Link
              to={`/articleDetail/${article.id}`}
              key={article.id}
              state={{ index: index }}
            >
              <div key={article.id} className="flex flex-col gap-3">
                <div className="text-sm text-gray-700">
                  <h3 className="text-base font-bold text-gray-900 leading-snug mt-1 dark:text-white">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 dark:text-white">
                    {article.title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* RecommendationArtilces */}
    </section>
  );
};

export default ArticleDetail;
