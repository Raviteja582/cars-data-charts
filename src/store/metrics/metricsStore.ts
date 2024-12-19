import { createSlice } from "@reduxjs/toolkit";
import { fetchCarsInformation } from "./metricQueries";

export interface CarsInformation {
  brands: string[];
  models: string[];
  cities: string[];
}

export interface MetricState {
  carsInformation: CarsInformation;
  loading: boolean;
  error: string;
}

const initialState: MetricState = {
  carsInformation: {
    brands: [],
    models: [],
    cities: [],
  },
  loading: false,
  error: null,
};

export const metricSlice = createSlice({
  name: "metrics",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCarsInformation.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCarsInformation.fulfilled, (state, action) => {
      state.carsInformation = action.payload;
      console.log("metrics carsInformation: ", state.carsInformation);
    });
    builder.addCase(fetchCarsInformation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addMatcher(fetchCarsInformation.settled, (state, action) => {
      state.loading = false;
    });
  },
});

export default metricSlice.reducer;
