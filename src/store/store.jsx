import { configureStore } from "@reduxjs/toolkit";
import accounts from "./CreateAccountSlice";
import login from "./LoginSlice";

const store = configureStore({
  reducer: {  accounts, login },
});
export default store;
