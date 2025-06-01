import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import { fetchSearchResults } from "../../../store/features/SearchSlice";
import ArticleCard from "./ArticleCard";
import Loader from "../../../components/Loader";

const UserArticleList = () => {
  const [articleData, setArticleData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const searchResults = useSelector((state) => state.search.results);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  console.log("article_data", articleData);
  useEffect(() => {
    const tags = searchParams.get("q");
    const time = searchParams.get("time");

    if (tags || time) {
      setIsSearching(true);
      setNoResults(false);

      dispatch(fetchSearchResults({ tags, time }))
        .unwrap()
        .then((data) => {
          if (data.length === 0) {
            setNoResults(true);
            setArticleData([]);
          } else {
            setArticleData(data);
          }
        })
        .catch((err) => {
          console.error("Search error:", err);
          setNoResults(true);
          setArticleData([]);
        });
    } else {
      // ✅ No query → Fetch all
      setIsSearching(false);
      const getAllArticles = async () => {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/articles`,
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setArticleData(data);
        }
      };
      getAllArticles();
    }
  }, [dispatch, searchParams])
  return (
    <div>
      {articleData.length > 0 ? (
        articleData.map((article, index) => (
          <ArticleCard key={index} index={index} articleData={article} />
        ))
      ) : noResults ? (
        <p className="text-center text-gray-500 mt-10">
          There are no items to show.
        </p>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UserArticleList;
