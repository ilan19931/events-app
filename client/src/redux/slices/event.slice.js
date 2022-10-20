import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  event: {},
  events: [],
  filteredEvents: [],
  comments: [],
  filters: [],
  errors: [],
  isLoading: true,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    loadEvent: (state, action) => {
      const { payload } = action;

      state.event = payload;
      state.isLoading = false;
    },
    loadEvents: (state, action) => {
      const { payload } = action;

      state.events = payload;
      state.filteredEvents = payload;
      state.isLoading = false;
    },
    loadComments: (state, action) => {
      const { payload } = action;

      state.comments = payload;
      state.isLoading = false;
    },
    addComment: (state, action) => {
      const { payload } = action;

      state.comments = [payload, ...state.comments];

      state.isLoading = false;
    },
    loadError: (state, action) => {
      const { payload } = action;

      state.errors = payload;
      state.isLoading = false;
    },
    loadFilteredEvents: (state, action) => {
      const { payload } = action;
      state.filteredEvents = payload;
      state.isLoading = false;
    },
    resetFilteredEvents: (state) => {
      state.filteredEvents = state.events;
      state.isLoading = false;
    },
  },
});

export const {
  loadEvent,
  loadEvents,
  loadComments,
  addComment,
  loadError,
  loadFilteredEvents,
  resetFilteredEvents,
} = eventSlice.actions;
export default eventSlice.reducer;
