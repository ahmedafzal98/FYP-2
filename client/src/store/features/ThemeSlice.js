// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   theme: localStorage.getItem("theme") || "light",
// };

// const themeSlice = createSlice({
//   name: "theme",
//   initialState,
//   reducers: {
//     toggleTheme: (state) => {
//       state.theme = state.theme === "light" ? "dark" : "light";
//       localStorage.setItem("theme", state.theme);
//     },
//   },
// });

// export const { toggleTheme } = themeSlice.actions;

// export default themeSlice.reducer;

// store/features/ThemeSlice.js
import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   theme: localStorage.getItem("theme") || "Light",
// };
const savedTheme = localStorage.getItem("theme");
const initialState = {
  // theme: savedTheme
  //   ? savedTheme.charAt(0).toUpperCase() + savedTheme.slice(1)
  //   : "Light",
  theme: localStorage.getItem("theme") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
