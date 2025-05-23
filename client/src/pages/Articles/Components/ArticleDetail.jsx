import {
  BookmarkMinus,
  CircleMinus,
  Ellipsis,
  Hand,
  MessageCircle,
} from "lucide-react";
import Seperator from "../../../components/Sepeartor";
import ActionButton from "../../../components/ActionButton";
import { useParams, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { FaPlayCircle, FaStopCircle } from "react-icons/fa";
import TextToSpeech from "../../../Hooks/TextToSpeech";
// import { articles } from "../data/DummyData";

const ArticleDetail = () => {
  //Old-work
  // const articles = useSelector((state) => state.articleEditor.detailArticle);
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
          `${import.meta.env.VITE_BASE_URL}/api/articles/${id}`
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

      fetch("https://fyp-2-4w8r.onrender.com/recommend", {
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
        <span
          className="text-[#242424] text-5xl font-bold"
          dangerouslySetInnerHTML={{ __html: article.title }}
        ></span>

        <div className="flex flex-col mt-[3%]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 cursor-pointer hover:opacity-50 rounded-full mt-2">
              <img
                src={article.authorImageUrl}
                alt="Author Image"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex w-full gap-4">
                <span
                  className="text-base font-light text-[#242424] cursor-pointer hover:underline"
                  dangerouslySetInnerHTML={{ __html: article.author }}
                ></span>

                <span className="text-base font-light text-[#242424] cursor-pointer hover:underline">
                  Follow
                </span>
              </div>
              <div className="flex justify-between  w-full items-center gap-3">
                <span className="text-[#6B6B6B]">12 min read</span>
                <span className="text-[#6B6B6B]">3 days ago</span>
              </div>
            </div>
          </div>
          <div className="gap-4 flex flex-col mt-[3%]">
            <Seperator />

            <div className="flex items-center justify-between">
              <div className="flex gap-6">
                <div className="flex gap-1">
                  <Hand strokeWidth={1} />
                  <span className="text-black font-extralight">12K</span>
                </div>
                <div className="flex gap-1">
                  <MessageCircle strokeWidth={1} />
                  <span className="text-black font-extralight">298</span>
                </div>
                <button onClick={() => speak(article.content)}>
                  {isSpeaking ? (
                    <FaStopCircle size={24} />
                  ) : (
                    <FaPlayCircle size={24} />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-6 w-1/2">
                <CircleMinus strokeWidth={1} />
                <BookmarkMinus strokeWidth={1} />
                <Ellipsis strokeWidth={1} />
              </div>
            </div>
            <Seperator />
          </div>
        </div>
        <div className="mt-[5%] flex flex-col">
          {/* <img
            src="https://miro.medium.com/v2/resize:fit:2000/format:webp/0*BwYfdzBCeWWX8NY7"
            alt="Article"
            className="w-full h-full object-contain"
          /> */}
          <div className="mt-5">
            <span
              className="text-black text-[15px] sm:text-2xl font-sans leading-normal"
              dangerouslySetInnerHTML={{ __html: article.content }}
            ></span>
          </div>
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
                  <span className="text-[#242424] font-normal ml-1 text-2xl cursor-pointer hover:underline">
                    Written by
                    <span
                      className="ml-1"
                      dangerouslySetInnerHTML={{ __html: article.author }}
                    ></span>
                  </span>
                </div>

                <div className="flex justify-between  w-full items-center gap-3">
                  <span className="text-[#6B6B6B] cursor-pointer hover:underline">
                    147 Followers
                  </span>
                  <span className="text-[#6B6B6B] cursor-pointer hover:underline">
                    6 Following
                  </span>
                </div>
              </div>
            </div>
            <ActionButton title="Follow" height="38" width="74" />
          </div>
          <div className="mt-5 w-5/6 mb-[5%]">
            <span>
              I'm a senior software engineer specializing in Java Spring Boot
              Microservices. I'm also a dedicated blogger at javadzone.com where
              I share java/springboot, etc.
            </span>
          </div>
          <Seperator />
        </div>
      </div>
      {/* Article Description  */}

      {/* RecommendationArtilces */}
      <div className="py-8">
        <h2 className="text-xl font-semibold mb-6">
          Recommended from Smart News Hub
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((article, index) => (
            <Link
              to={`/articleDetail/${article.id}`}
              key={article.id}
              state={{ index: index }}
              // state={{ index }}
            >
              <div key={article.id} className="flex flex-col gap-3">
                <div className="text-sm text-gray-700">
                  <h3 className="text-base font-bold text-gray-900 leading-snug mt-1">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{article.title}</p>
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
