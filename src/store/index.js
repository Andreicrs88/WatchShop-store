import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import activePageSlice from "./active-page-slice";
import cartSlice from "./cart-slice";
import favoritesSlice from "./favorites-slice";
import filteredItemsSlice from "./filtered-items-slice";
import backdropSlice from "./backdrop-slice";
import authSlice from "./auth-slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  whitelist: ["activePage", "cart", "favorites", "filtered", "auth"],
};

const reducer = combineReducers({
  activePage: activePageSlice.reducer,
  cart: cartSlice.reducer,
  favorites: favoritesSlice.reducer,
  filtered: filteredItemsSlice.reducer,
  backdrop: backdropSlice.reducer,
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
