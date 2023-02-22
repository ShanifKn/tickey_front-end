import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { adminSlice } from "./Slice/adminSlice";
import { agentSlice } from "./Slice/userSlice";

const persistConfig = { key: "root", storage, version: 1 };

const agentPersistedReducer = persistReducer(persistConfig, agentSlice.reducer);
const adminPersistedReducer = persistReducer(persistConfig, adminSlice.reducer);

export const store = configureStore({
  reducer: {
    agent: agentPersistedReducer,
    admin: adminPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
