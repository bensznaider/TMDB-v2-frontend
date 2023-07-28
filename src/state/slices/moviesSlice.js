import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlaying: [],
    topRated: [],
  },
  reducers: {
    setNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
    setTopRated: (state, action) => {
      state.topRated = action.payload;
    },
  },
});

export const { setNowPlaying, setTopRated } = moviesSlice.actions;
export default moviesSlice.reducer;
