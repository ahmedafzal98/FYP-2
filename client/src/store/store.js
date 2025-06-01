import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./features/AuthSlice";
import editorReducer from "./features/ArticleEditorSlice";
import searchReducer from "./features/SearchSlice";
import themeReducer from "./features/ThemeSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  articleEditor: editorReducer,
  search: searchReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
