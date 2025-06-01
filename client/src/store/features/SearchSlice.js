// ✅ Redux Slice (features/searchSlice.js)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async ({ tags, time }) => {
    const params = new URLSearchParams();
    if (tags) params.append("tags", tags);
    if (time) params.append("time", time);
    console.log("tags or time", tags, time);
    const res = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/api/articles/search?${params.toString()}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch search results");
    const data = await res.json();
    console.log("data", data);
    return data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
