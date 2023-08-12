import { configureStore } from "@reduxjs/toolkit";
import isMobileReducer from "./slices/isMobileSlice"
import moviesReducer from "./slices/moviesSlice"
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    isMobile: isMobileReducer,
    movies: moviesReducer,
    loggedUser: userReducer,
  },
})

export default store