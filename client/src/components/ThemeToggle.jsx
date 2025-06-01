// import { useState, useEffect } from "react";
// import { toggleTheme } from "../store/features/ThemeSlice";
// import { useDispatch, useSelector } from "react-redux";
// const ThemeToggle = () => {
//   // const [theme, setTheme] = useState("Dark");
//   // const [isOpen, setIsOpen] = useState(false);

//   const theme = useSelector((state) => state.theme.theme);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [theme]);

//   const themes = ["System", "Dark", "Light"];

//   const handleSelect = (value) => {
//     setTheme(value);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative inline-block w-32 text-left">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full bg-black  text-white px-4 py-2 rounded-md flex justify-between items-center hover:bg-white hover:text-black hover:border-black hover:border-2"
//       >
//         {/* {theme} */}
//         <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
//           <path
//             fillRule="evenodd"
//             d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 011.08 1.04l-4.25 4.657a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>

//       {isOpen && (
//         <div className="absolute z-10 mt-2 w-full bg-white border border-gray-600 rounded-md shadow-lg">
//           {themes.map((item) => (
//             <div
//               key={item}
//               onClick={() => handleSelect(item)}
//               className={`cursor-pointer px-4 py-2 hover:bg-black hover:text-white ${
//                 item === theme ? "bg-black text-white" : ""
//               }`}
//             >
//               {item}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ThemeToggle;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setTheme } from "../store/features/ThemeSlice";

// const ThemeToggle = () => {
//   const [isOpen, setIsOpen] = useState(false); // restored!
//   const theme = useSelector((state) => state.theme.theme);
//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   if (theme.toLowerCase() === "dark") {
//   //     document.documentElement.classList.add("dark");
//   //   } else {
//   //     document.documentElement.classList.remove("dark");
//   //   }
//   // }, [theme]);

//   useEffect(() => {
//     const userSystemPrefersDark = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;

//     if (
//       theme.toLowerCase() === "dark" ||
//       (theme.toLowerCase() === "system" && userSystemPrefersDark)
//     ) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [theme]);

//   const themes = ["System", "Dark", "Light"];

//   const handleSelect = (value) => {
//     dispatch(setTheme(value));
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative inline-block w-32 text-left">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full bg-black text-white px-4 py-2 rounded-md flex justify-between items-center hover:bg-white hover:text-black hover:border-black hover:border-2"
//       >
//         {theme}
//         <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
//           <path
//             fillRule="evenodd"
//             d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 011.08 1.04l-4.25 4.657a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>

//       {isOpen && (
//         <div className="absolute z-10 mt-2 w-full bg-white border border-gray-600 rounded-md shadow-lg">
//           {themes.map((item) => (
//             <div
//               key={item}
//               onClick={() => handleSelect(item)}
//               className={`cursor-pointer px-4 py-2 hover:bg-black hover:text-white ${
//                 item === theme ? "bg-black text-white" : ""
//               }`}
//             >
//               {item}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ThemeToggle;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setTheme } from "../store/features/ThemeSlice";

// const ThemeToggle = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const theme = useSelector((state) => state.theme.theme);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (theme.toLowerCase() === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [theme]);

//   const themes = ["Dark", "Light"]; // removed "System"

//   const handleSelect = (value) => {
//     dispatch(setTheme(value));
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative inline-block w-32 text-left">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full bg-black text-white px-4 py-2 rounded-md flex justify-between items-center hover:bg-white hover:text-black hover:border-black hover:border-2"
//       >
//         {theme}
//         <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
//           <path
//             fillRule="evenodd"
//             d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 011.08 1.04l-4.25 4.657a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>

//       {isOpen && (
//         <div className="absolute z-10 mt-2 w-full bg-white border border-gray-600 rounded-md shadow-lg">
//           {themes.map((item) => (
//             <div
//               key={item}
//               onClick={() => handleSelect(item)}
//               className={`cursor-pointer px-4 py-2 hover:bg-black hover:text-white ${
//                 item === theme ? "bg-black text-white" : ""
//               }`}
//             >
//               {item}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ThemeToggle;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/features/ThemeSlice";

const ThemeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const themes = ["dark", "light"];

  const handleSelect = (value) => {
    dispatch(setTheme(value));
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-32 text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black text-white px-4 py-2 rounded-md flex justify-between items-center hover:bg-white hover:text-black hover:border-black hover:border-2 dark:hover:border-white dark:border-2"
      >
        {theme}
        <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 011.08 1.04l-4.25 4.657a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-600 rounded-md shadow-lg">
          {themes.map((item) => (
            <div
              key={item}
              onClick={() => handleSelect(item)}
              className={`cursor-pointer px-4 py-2 hover:bg-black hover:text-white ${
                item === theme ? "bg-black text-white" : ""
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
