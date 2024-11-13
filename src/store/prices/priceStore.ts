import { createSlice } from "@reduxjs/toolkit";
import { fetchCarPricesByIds } from "./priceOperations";

export type PricePerMonth = {
  January: number[];
  February: number[];
  March: number[];
  April: number[];
  May: number[];
  June: number[];
  July: number[];
  August: number[];
  September: number[];
  October: number[];
  November: number[];
  December: number[];
};

export type Prices = Record<string, PricePerMonth>;

export interface PriceState {
  currentPriceData: Record<string, Prices>;
  isFetchingPrice: boolean;
}

const initialState: PriceState = {
  currentPriceData: {},
  isFetchingPrice: false,
};

export const pricesSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCarPricesByIds.pending, (state, action) => {
      state.isFetchingPrice = true;
    });
    builder.addCase(fetchCarPricesByIds.fulfilled, (state, action) => {
      state.currentPriceData = action.payload;
      console.log("price store current priceData: ", state.currentPriceData);
    });
    builder.addMatcher(fetchCarPricesByIds.settled, (state, action) => {
      state.isFetchingPrice = false;
    });
  },
});

export default pricesSlice.reducer;
