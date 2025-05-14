import { createSlice } from "@reduxjs/toolkit";

const articleEditorSlice = createSlice({
  name: "articleEditor",
  initialState: {
    triggerSubmit: false,
    title: "",
    content: "",
    tags: [],
    detailArticle: {},
  },
  reducers: {
    setArticleData: (state, action) => {
      if (action.payload.title) {
        state.title = action.payload.title;
      }
      if (action.payload.content) {
        state.content = action.payload.content;
      }
      if (action.payload.tags) {
        state.tags = action.payload.tags;
      }
    },
    setTriggerSubmit: (state, action) => {
      state.triggerSubmit = action.payload;
    },
    setDetailArticle: (state, action) => {
      state.detailArticle = action.payload;
    },
  },
});

export const { setTriggerSubmit, setArticleData, setDetailArticle } =
  articleEditorSlice.actions;
export default articleEditorSlice.reducer;
