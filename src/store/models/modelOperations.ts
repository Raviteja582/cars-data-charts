import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs } from "firebase/firestore";
import { UserSelectionOptions, CarModel } from "./modelsStore";
import {
  getBrandNameWithPrefix,
  getModelNameWithPrefix,
  getTrimNameWithPrefix,
} from "./modelQueries";
import { capitalize } from "lodash";

export const fetchModelNameWithPrefix = createAsyncThunk<
  UserSelectionOptions[],
  { prefixString: string; brandNames: string[] }
>("models/fetchModelNameWithPrefix", async ({ prefixString, brandNames }) => {
  const results = await getDocs(
    getModelNameWithPrefix(prefixString, brandNames)
  );
  const options: UserSelectionOptions[] = [];
  const filterBrandSet = new Set<string>();
  results.forEach((model) => {
    const resultData: CarModel = model.data() as CarModel;
    if (filterBrandSet.has(resultData.model_name)) return;
    filterBrandSet.add(resultData.model_name);
    options.push({
      label: capitalize(resultData.model_name),
      value: resultData.model_name,
    });
  });
  console.log("Fetched Prefix Model Options: ", options);
  return options;
});

export const fetchBrandNameWithPrefix = createAsyncThunk<
  UserSelectionOptions[],
  string
>("models/fetchBrandNameWithPrefix", async (prefixString: string) => {
  const results = await getDocs(getBrandNameWithPrefix(prefixString));

  const options: UserSelectionOptions[] = [];
  const filterBrandSet = new Set<string>();
  results.forEach((model) => {
    const resultData: CarModel = model.data() as CarModel;
    if (filterBrandSet.has(resultData.brand_name)) return;
    filterBrandSet.add(resultData.brand_name);
    options.push({
      label: capitalize(resultData.brand_name),
      value: resultData.brand_name,
    });
  });
  console.log("Fetched Prefix brand Options: ", options);
  return options;
});

export const fetchTrimNameWithPrefix = createAsyncThunk<
  UserSelectionOptions[],
  { prefixString: string; brandNames: string[]; modelNames: string[] }
>(
  "models/fetchTrimNameWithPrefix",
  async ({ prefixString, brandNames, modelNames }) => {
    const results = await getDocs(
      getTrimNameWithPrefix(prefixString, brandNames, modelNames)
    );

    const options: UserSelectionOptions[] = [];
    const filterBrandSet = new Set<string>();
    results.forEach((model) => {
      const resultData: CarModel = model.data() as CarModel;
      if (filterBrandSet.has(resultData.trim_name)) return;
      filterBrandSet.add(resultData.trim_name);
      options.push({
        label: resultData.trim_name,
        value: resultData.trim_name,
        id: resultData.id,
      });
    });
    // console.log("Fetched Prefix brand Options: ", options);
    return options;
  }
);
