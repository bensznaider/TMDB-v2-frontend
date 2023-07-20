import { configureStore } from "@reduxjs/toolkit";
import isMobileReducer from "./slices/isMobileSlice"

const store = configureStore({
  reducer: {
    isMobile: isMobileReducer,
  },
})

export default store