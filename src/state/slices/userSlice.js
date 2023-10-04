import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "loggedUser",
  initialState: { userId: null, email: null },
  reducers: {
    setLoggedUser: (state, action) => {
      const { userId, email } = action.payload;
      return { ...state, userId, email };
    },
  },
});
export const { setLoggedUser } = userSlice.actions;
export default userSlice.reducer;
