import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/AuthSlice";
export const store = configureStore({
  reducer: authReducer,
});

export default store;
