import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authReducer from "./slices/auth.slice.js";
import eventReducer from "./slices/event.slice.js";
import alertReducer from "./slices/alert.slice.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
  alerts: alertReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
