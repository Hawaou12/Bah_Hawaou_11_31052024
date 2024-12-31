import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./helpers/features/userSlice"; // Assurez-vous que le nom est correct
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk"; // Utilisation des accolades pour un import nommé
// Supprimez les accolades ici

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, useReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);
