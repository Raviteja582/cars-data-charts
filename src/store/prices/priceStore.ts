import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPrices } from "./priceOperations";

export type PriceData = {
  new_avg_price: number;
  new_sales_count: number;
  total_avg_price: number;
  total_sales_count: number;
  used_avg_price: number;
  used_sales_count: number;
};

export type PriceState = {
  brands: Record<string, Array<[number, number]>>;
  models: Record<string, Array<[number, number]>>;
  cities: Record<string, Array<[number, number]>>;
  loading: boolean;
  error: string;
  filter_name: string;
};

const initialState: PriceState = {
  brands: {},
  models: {},
  cities: {},
  loading: false,
  error: null,
  filter_name: null,
};

export const pricesSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    setFilterName: (state, action: PayloadAction<string>) => {
      state.filter_name = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPrices.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPrices.fulfilled, (state, action) => {
      const key = action.payload.key;
      const opt = action.payload.output;
      state.filter_name = key;
      if (key === "brands") {
        state.brands = { ...state.brands, ...opt };
      } else if (key === "models") {
        state.models = { ...state.models, ...opt };
      } else {
        state.cities = { ...state.cities, ...opt };
      }
    });
    builder.addMatcher(fetchPrices.settled, (state, action) => {
      state.loading = false;
    });
  },
});

export default pricesSlice.reducer;
