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

      console.log(state.events);

      state.events = [
        ...state.events.filter((s) => {
          console.log(s);
        }),
      ];
    },
  },
});

export const { addAlert, removeAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
