import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserSelectionOptions {
  value: string;
  label: string;
  isFixed?: boolean;
  id?: string;
}

export interface CarModel {
  id: string;
  brand_name: string;
  model_name: string;
  trim_name: string;
}

export interface ModelState {
  iDs: string[];
  brand_names: string[];
  model_names: string[];
  trim_names: UserSelectionOptions[];
}

const initialState: ModelState = {
  iDs: [],
  brand_names: [],
  model_names: [],
  trim_names: [],
};

export const modelsSlice = createSlice({
  name: "models",
  initialState,
  reducers: {
    setBrands(state: ModelState, { payload }: PayloadAction<string[]>) {
      state.brand_names = payload;
    },
    setModels(state: ModelState, { payload }: PayloadAction<string[]>) {
      state.model_names = payload;
    },
    setTrims(
      state: ModelState,
      { payload }: PayloadAction<UserSelectionOptions[]>
    ) {
      state.trim_names = payload;
    },
    setIDs(state: ModelState, { payload }: PayloadAction<string[]>) {
      state.iDs = payload;
    },
  },
});

export const getModelState = (store: RootState): ModelState => {
  console.log("reading models: ", store.models);
  return store.models;
};

// Action creators are generated for each case reducer function
export const { setBrands, setModels, setTrims, setIDs } = modelsSlice.actions;

export default modelsSlice.reducer;
