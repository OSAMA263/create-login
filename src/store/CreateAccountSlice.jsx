import { createSlice } from "@reduxjs/toolkit";

const UsersSlice = createSlice({
  initialState: {
    users: localStorage.users ? JSON.parse(localStorage.users) : [],
  },
  name: "accounts",
  reducers: {
    CreateUser: ({ users }, action) => {
      users.push(action.payload);
    },
  },
});

export const { CreateUser } = UsersSlice.actions;

export default UsersSlice.reducer;
