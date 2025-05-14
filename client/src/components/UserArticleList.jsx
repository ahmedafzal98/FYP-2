import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

const UserArticleList = () => {
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    const getAllArticles = async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/articles`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setArticleData(data);
      } else {
        console.error("Error fetching articles:", res.statusText);
      }
    };

    getAllArticles();
  }, []);
  return (
    <div>
      {articleData.length > 0 ? (
        articleData.map((article, index) => (
          <ArticleCard key={index} articleData={article} />
        ))
      ) : (
        <p>No articles available</p>
      )}
    </div>
  );
};
export default UserArticleList;
