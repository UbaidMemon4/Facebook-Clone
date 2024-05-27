import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    forgetEmail: "",
  },
  reducers: {
    Login(state) {
      state.isLogin = true;
    },
    Logout(state) {
      state.isLogin = false;
    },
    ForgetEmail(state, action) {
      state.forgetEmail = action.payload;
    },
  },
});
export const authAction = authSlice.actions;
export const store = configureStore({
  reducer: authSlice.reducer,
});
