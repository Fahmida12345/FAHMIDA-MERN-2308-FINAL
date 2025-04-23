import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    account: localStorage.getItem("fahmida-yeasmin-frontend")
      ? JSON.parse(localStorage.getItem("fahmida-yeasmin-frontend"))
      : "",
  },
  reducers: {
    AccountReducer: (state, action) => {
      state.account = action.payload;
      localStorage.setItem(
        "fahmida-yeasmin-frontend",
        JSON.stringify(action.payload)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { AccountReducer } = AuthSlice.actions;

export default AuthSlice.reducer;
