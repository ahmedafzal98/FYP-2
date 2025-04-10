import {
  BookmarkMinus,
  CircleMinus,
  Ellipsis,
  Hand,
  MessageCircle,
} from "lucide-react";

import Seperator from "./Sepeartor";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDetailArticle } from "../store/features/ArticleEditorSlice";

const ArticleCard = ({ articleData, key }) => {
  const [imageUrl, setImageUrl] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const htmlContent = articleData.content;
    const regex = /<img[^>]+src="([^">]+)"/;
    const match = htmlContent.match(regex);
    if (match) {
      setImageUrl(match[1]);
    }
  }, [articleData.content]);

  const handleDetailArticle = async (id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/api/articles/${id}`;
    console.log(url);
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    dispatch(setDetailArticle(result));
    console.log(result);
  };

  return (
    <>
      <section className="flex items-center w-full ml-6 mt-6" key={key}>
        <div className="w-1/2">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 cursor-pointer hover:opacity-50">
              <img
                src={articleData.authorImageUrl}
                alt="Author Image"
                className="rounded-full"
              />
            </div>
            <span className="text-black cursor-pointer hover:underline">
              {articleData.author}
            </span>
          </div>
          <div
            onClick={() => handleDetailArticle(articleData._id)}
            className="w-full flex flex-wrap cursor-pointer mt-6"
          >
            <Link
              to={`/articleDetail/${articleData._id}`}
              className="flex flex-col gap-3"
            >
              <span
                className="text-black font-bold text-2xl leading-tight"
                dangerouslySetInnerHTML={{ __html: articleData.title }}
              ></span>
              <span
                className="text-base text-[#6B6B6B]"
                dangerouslySetInnerHTML={{ __html: articleData.summary }}
              ></span>
              <div className="mb-6 flex items-center justify-between mt-3">
                <div className="flex items-center gap-6 w-1/2">
                  <span className="text-[#6B6B6B] text-[13px]">
                    {articleData.date}
                  </span>
                  <div className="flex gap-1">
                    <Hand strokeWidth={1} />
                    <span className="text-black font-extralight">118K</span>
                  </div>
                  <div className="flex gap-1">
                    <MessageCircle strokeWidth={1} />
                    <span className="text-black font-extralight">128K</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-1/2">
                  <CircleMinus strokeWidth={1} />
                  <BookmarkMinus strokeWidth={1} />
                  <Ellipsis strokeWidth={1} />
                </div>
              </div>
            </Link>
            <Seperator />
          </div>
        </div>

        {imageUrl && (
          <Link to={`/articleDetail/${articleData.id}`}>
            <div className="w-40 h-36 rounded-xl overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-105">
              <img
                src={imageUrl}
                alt="Article"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        )}
      </section>
    </>
  );
};
export default ArticleCard;
