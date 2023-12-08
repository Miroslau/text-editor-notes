import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import rootReducers from "./reducers";

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
