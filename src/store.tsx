import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categories";
import orderSlice from "./slices/order";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
