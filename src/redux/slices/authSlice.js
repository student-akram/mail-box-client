import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
  email: localStorage.getItem("email") || "",
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },

    logout(state) {
      state.token = "";
      state.email = "";
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;