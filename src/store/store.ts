import {
  Action,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import modelReducer from "./models/modelsStore";
import priceReducer from './prices/priceStore';
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    models: modelReducer,
    prices: priceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export const useAppDispatch: () => AppDispatch = useDispatch;
