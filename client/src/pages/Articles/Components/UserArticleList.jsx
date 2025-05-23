import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import Loader from "../../../components/Loader";

const UserArticleList = () => {
  const [articleData, setArticleData] = useState([]);

  //Fetch-Articles:
  useEffect(() => {
    const getAllArticles = async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/articles`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setArticleData(data);
        console.log("Articles", data);
      } else {
        console.error("Error fetching articles:", res.statusText);
      }
    };

    getAllArticles();
  }, []);
  //Fetch-Articles:

  // articleData.forEach((article) => {
  //   console.log("Author Image URL:", article.authorImageUrl);
  //   if (!article.authorImageUrl) {
  //     console.warn("Missing image for article:", article.title);
  //   }
  // });
  return (
    <div>
      {articleData.length > 0 ? (
        articleData.map((article, index) => (
          <ArticleCard index={index} articleData={article} />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default UserArticleList;
