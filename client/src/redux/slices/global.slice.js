import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    addFile: (state, action) => {
      const { payload } = action;

      state.files.push(payload);
    },
    clearFiles: (state) => {
      state.files = [];
    },
  },
});

export const { addFile, clearFiles } = globalSlice.actions;

export default globalSlice.reducer;
