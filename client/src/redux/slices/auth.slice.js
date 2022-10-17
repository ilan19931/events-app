import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  errors: [],
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
    },
    signInSuccess: (state, action) => {
      const { payload } = action;

      state.user = payload.user;
      state.isLoading = false;
    },
    signInFail: (state, action) => {
      const { payload } = action;

      return {
        ...initialState,
        errors: payload,
      };
    },

    signOut: (state) => {
      return initialState;
    },
  },
});

export const { signInStart, signInSuccess, signInFail } = authSlice.actions;
export default authSlice.reducer;
