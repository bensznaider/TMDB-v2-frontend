import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlaying: [],
    topRated: [],
    searchResults: [],
  },
  reducers: {
    setNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
    setTopRated: (state, action) => {
      state.topRated = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setNowPlaying, setTopRated, setSearchResults } = moviesSlice.actions;
export default moviesSlice.reducer;
