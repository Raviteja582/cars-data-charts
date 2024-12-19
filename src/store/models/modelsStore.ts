import { createSlice } from "@reduxjs/toolkit";
import { fetchCarPrices } from "./modelOperations";

export interface UserSelectionOptions {
  value: string;
  label: string;
  brand_name?: string;
  model_name?: string;
}

export interface ModelState {
  isLoading: boolean;
  lineSeries: Record<string, number[][]>;
}

const initialState: ModelState = {
  isLoading: false,
  lineSeries: {},
};

export const modelsSlice = createSlice({
  name: "models",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCarPrices.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCarPrices.fulfilled, (state, action) => {
      state.lineSeries = action.payload;
      console.log("price store current priceData: ", state.lineSeries);
    });
    builder.addMatcher(fetchCarPrices.settled, (state, action) => {
      state.isLoading = false;
    });
    // builder.addMatcher(fetchCarPrices.rejected, (state, error) => {
    //   state.isLoading = false;
    // });
  },
});

// Action creators are generated for each case reducer function
// export const {} = modelsSlice.actions;

export default modelsSlice.reducer;
