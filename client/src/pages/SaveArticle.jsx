// import React, { useEffect, useState } from "react";
// import ArticleCard from "./Articles/Components/ArticleCard";
// import axios from "axios";

// const SaveArticle = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchSavedArticles = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/watchlater", {
//         withCredentials: true,
//       });

//       const mappedArticles = res.data.map((item, index) => ({
//         ...item.articleId,
//         _watchLaterId: item._id,
//         _index: index,
//       }));

//       setArticles(mappedArticles);
//     } catch (error) {
//       console.error("Failed to fetch saved articles:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSavedArticles();
//   }, []);

//   return (
//     <div className="min-h-screen text-gray-900 dark:text-white">
//       <main className="max-w-6xl mx-auto px-6 py-10">
//         <div className="flex gap-8">
//           <div className="flex flex-col min-w-[400px]">
//             <div className="flex gap-4 items-center">
//               <p className="w-10 h-10 rounded-full bg-gray-400 text-white text-xl flex items-center justify-center">
//                 S
//               </p>
//               <p className="text-[18px]">smartnewshub</p>
//             </div>

//             <p className="text-3xl pt-6 font-bold">Saved List</p>

//             {loading ? (
//               <p className="mt-4 text-sm">Loading...</p>
//             ) : articles.length === 0 ? (
//               <p className="mt-4 text-sm text-gray-400">
//                 No saved articles yet.
//               </p>
//             ) : (
//               articles.map((articleData, ind) => (
//                 <ArticleCard
//                   key={articleData._id}
//                   articleData={articleData}
//                   id={ind}
//                 />
//               ))
//             )}
//           </div>

//           <div className="border-l-1 opacity-50 border-black h-screen"></div>

//           <div className="flex flex-col items-center">
//             <div className="w-16 h-16 rounded-full bg-gray-400 text-white text-3xl flex items-center justify-center">
//               S
//             </div>
//             <p className="text-[18px] pt-1">smartnewshub</p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SaveArticle;

import React, { useEffect, useState } from "react";
import ArticleCard from "./Articles/Components/ArticleCard";
import axios from "axios";

const SaveArticle = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all saved articles on mount
  const fetchSavedArticles = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/watchlater", {
        withCredentials: true,
      });

      const mappedArticles = res.data.map((item, index) => ({
        ...item.articleId,
        _watchLaterId: item._id, // custom ID to use for deletion
        _index: index,
      }));

      setArticles(mappedArticles);
    } catch (error) {
      console.error("Failed to fetch saved articles:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedArticles();
  }, []);

  // Handle delete from Watch Later list
  const handleDelete = async (watchLaterId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/watchlater/${watchLaterId}`,
        {
          withCredentials: true,
        }
      );

      // Remove the article from state
      setArticles((prev) =>
        prev.filter((article) => article._watchLaterId !== watchLaterId)
      );

      console.log("Article removed from Watch Later.");
    } catch (error) {
      console.error("Failed to delete saved article:", error.message);
    }
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-white">
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex gap-8">
          <div className="flex flex-col min-w-[400px]">
            <div className="flex gap-4 items-center">
              <p className="w-10 h-10 rounded-full bg-gray-400 text-white text-xl flex items-center justify-center">
                S
              </p>
              <p className="text-[18px]">smartnewshub</p>
            </div>

            <p className="text-3xl pt-6 font-bold">Watch Later</p>

            {loading ? (
              <p className="mt-4 text-sm">Loading...</p>
            ) : articles.length === 0 ? (
              <p className="mt-4 text-sm text-gray-400">
                No saved articles yet.
              </p>
            ) : (
              articles.map((articleData) => (
                <ArticleCard
                  key={articleData._id}
                  articleData={articleData}
                  index={articleData._index}
                  onDelete={() => handleDelete(articleData._watchLaterId)}
                />
              ))
            )}
          </div>

          <div className="border-l-1 opacity-50 border-black h-screen"></div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-400 text-white text-3xl flex items-center justify-center">
              S
            </div>
            <p className="text-[18px] pt-1">smartnewshub</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SaveArticle;
