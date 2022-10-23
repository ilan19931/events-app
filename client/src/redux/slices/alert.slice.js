import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: [],
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addAlert: (state, action) => {
      const { payload } = action;

      state.alerts.push(payload);
    },
    removeAlert: (state, action) => {
      const { payload } = action;

      state.alerts = [...state.alerts.filter((s) => s._id !== payload)];
    },
  },
});

export const { addAlert, removeAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
