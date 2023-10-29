import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  initialState: localStorage.loggedIn ? JSON.parse(localStorage.loggedIn) : {},
  name: "login",
  reducers: {
    LogInUser: (state, action) => (state = { ...action.payload }),
  },
});

export const { LogInUser } = LoginSlice.actions;
export default LoginSlice.reducer;
