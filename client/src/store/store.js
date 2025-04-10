import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/AuthSlice";
import editorReducer from "./features/ArticleEditorSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    articleEditor: editorReducer,
  },
});

export default store;
