// // import React, { useEffect, useState } from "react";
// // import { FaSearch, FaFilter } from "react-icons/fa";

// // const Search = () => {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [exactPhrase, setExactPhrase] = useState("");
// //   const [dateFilter, setDateFilter] = useState("any");

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     console.log({ searchTerm, exactPhrase, dateFilter });
// //   };

// //   useEffect(() => {}, [

// //   ]);

// //   return (
// //     <div className="relative w-full max-w-3xl mx-auto">
// //       {/* Search Field */}
// //       <form
// //         onSubmit={handleSearch}
// //         className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
// //       >
// //         <FaSearch className="text-gray-500 mr-2" />
// //         <input
// //           type="text"
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           placeholder="Search for topics, location…"
// //           className="w-full outline-none text-sm"
// //         />
// //         <button
// //           type="button"
// //           onClick={() => setShowFilters(!showFilters)}
// //           className="ml-3 text-gray-500 hover:text-blue-600"
// //         >
// //           <FaFilter />
// //         </button>
// //       </form>

// //       {/* Optional Filters */}
// //       {showFilters && (
// //         <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md z-10 p-4">
// //           {/* Exact Phrase */}
// //           <div className="mb-3">
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Exact phrase
// //             </label>
// //             <input
// //               type="text"
// //               value={exactPhrase}
// //               onChange={(e) => setExactPhrase(e.target.value)}
// //               placeholder="Enter exact phrase"
// //               className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
// //             />
// //           </div>

// //           {/* Date Filter */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Date
// //             </label>
// //             <select
// //               value={dateFilter}
// //               onChange={(e) => setDateFilter(e.target.value)}
// //               className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
// //             >
// //               <option value="any">Any time</option>
// //               <option value="hour">Past hour</option>
// //               <option value="24h">Past 24 hours</option>
// //               <option value="week">Past week</option>
// //               <option value="year">Past year</option>
// //             </select>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Search;

// import React, { useState } from "react";
// import { FaSearch, FaFilter } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { fetchSearchResults } from "../store/features/SearchSlice";

// const SearchBar = () => {
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [timeFilter, setTimeFilter] = useState("any");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log("search_value", searchTerm);
//     dispatch(
//       fetchSearchResults({
//         tags: searchTerm.trim(), // main input treated as tags
//         time: timeFilter !== "any" ? timeFilter : undefined,
//       })
//     );
//   };

//   return (
//     <div className="relative w-full max-w-3xl mx-auto">
//       <form
//         onSubmit={handleSearch}
//         className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm"
//       >
//         <FaSearch className="text-gray-500 mr-2" />
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search by tags..."
//           className="w-full outline-none text-sm"
//         />
//         <button
//           type="button"
//           onClick={() => setShowFilters(!showFilters)}
//           className="ml-3 text-gray-500 hover:text-blue-600"
//         >
//           <FaFilter />
//         </button>
//       </form>

//       {showFilters && (
//         <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md z-10 p-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Date
//             </label>
//             <select
//               value={timeFilter}
//               onChange={(e) => setTimeFilter(e.target.value)}
//               className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
//             >
//               <option value="any">Any time</option>
//               <option value="past day">Past day</option>
//               <option value="past week">Past week</option>
//               <option value="past month">Past month</option>
//               <option value="past year">Past year</option>
//             </select>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { fetchSearchResults } from "../store/features/SearchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 👈 NEW

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [timeFilter, setTimeFilter] = useState("any");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("q", searchTerm.trim());
    if (timeFilter !== "any") params.set("time", timeFilter);

    // 👇 Push query params to URL
    navigate(`/articles?${params.toString()}`);

    // 👇 Optionally also dispatch Redux call (if not handled by component on mount)
    dispatch(
      fetchSearchResults({
        tags: searchTerm.trim(),
        time: timeFilter !== "any" ? timeFilter : undefined,
      })
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm"
      >
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by tags..."
          className="w-full outline-none text-sm"
        />
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="ml-3 text-gray-500 hover:text-blue-600"
        >
          <FaFilter />
        </button>
      </form>

      {showFilters && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md z-10 p-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="past hour">past hour</option>
              <option value="past 24 hour">past 24 hour</option>
              <option value="past week">past week</option>
              <option value="past year">past year</option>
              <option value="anytime">anytime</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
