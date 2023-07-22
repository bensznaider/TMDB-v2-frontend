import { configureStore } from "@reduxjs/toolkit";
import isMobileReducer from "./slices/isMobileSlice"
import moviesReducer from "./slices/moviesSlice"

const store = configureStore({
  reducer: {
    isMobile: isMobileReducer,
    movies: moviesReducer,
  },
})

export default store