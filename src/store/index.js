import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist the 'user' reducer
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for persist
    }),
});

export const persistor = persistStore(store);

export default store;
