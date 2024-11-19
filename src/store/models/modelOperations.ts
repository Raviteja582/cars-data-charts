import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs } from "firebase/firestore";
import { UserSelectionOptions, CarModel } from "./modelsStore";
import {
  getAttributeAvgDataOnCities,
  getBrandNameWithPrefix,
  getCityNameWithPrefix,
  getModelNameWithPrefix,
  getOneAttributesAvg,
} from "./modelQueries";
import { capitalize, isEmpty } from "lodash";

export const fetchModelNameWithPrefix = createAsyncThunk<
  UserSelectionOptions[],
  { prefixString: string }
>("models/fetchModelNameWithPrefix", async ({ prefixString }) => {
  const results = await getDocs(getModelNameWithPrefix(prefixString));
  const options: UserSelectionOptions[] = [];
  const filterModelSet = new Set<string>();

  results.forEach((model) => {
    const resultData: CarModel = model.data() as CarModel;
    if (filterModelSet.has(resultData.model_name)) return;
    filterModelSet.add(resultData.model_name);
    options.push({
      label: capitalize(resultData.model_name),
      value: resultData.model_name,
      brand_name: resultData.brand_name,
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

export const fetchCityNameWithPrefix = createAsyncThunk<
  UserSelectionOptions[],
  { prefixString: string }
>("models/fetchTrimNameWithPrefix", async ({ prefixString }) => {
  const results = await getDocs(getCityNameWithPrefix(prefixString));

  const options: UserSelectionOptions[] = [];
  const filterCitySet = new Set<string>();
  results.forEach((city) => {
    const resultData: CarModel = city.data() as CarModel;
    if (filterCitySet.has(resultData.city_name)) return;
    filterCitySet.add(resultData.city_name);
    options.push({
      label: resultData.city_name,
      value: resultData.city_name,
    });
  });
  // console.log("Fetched Prefix city Options: ", options);
  return options;
});

export const fetchCarPrices = createAsyncThunk<
  Record<string, number[][]>,
  {
    brandNames: string[];
    modelNames: string[];
    cities: string[];
    conditions: string[];
  },
  {
    rejectValue: string;
  }
>(
  "prices/fetchCarPrices",
  async ({ brandNames, modelNames, cities, conditions }, thunkApi) => {
    const isBrandSelected = !isEmpty(brandNames);
    const isModelSelected = !isEmpty(modelNames);
    const isCitySelected = !isEmpty(cities);

    // Only brand is selected, conditions is optional
    if (isBrandSelected && !isModelSelected && !isCitySelected) {
      const results: Record<string, number[][]> = await getOneAttributesAvg(
        brandNames,
        "brand_name",
        conditions
      );

      return results;
    }

    // Either only model is selected or both brand & model are selected, conditions is optional
    else if (isBrandSelected && isModelSelected && !isCitySelected) {
      const results: Record<string, number[][]> = await getOneAttributesAvg(
        modelNames,
        "model_name",
        conditions
      );

      return results;
    }

    // Only cities are selected, conditions is optional
    else if (!isBrandSelected && !isModelSelected && isCitySelected) {
      const results: Record<string, number[][]> = await getOneAttributesAvg(
        cities,
        "city_name",
        conditions
      );

      return results;
    }

    // both brand and city selected, conditions is optional
    else if (isBrandSelected && !isModelSelected && isCitySelected) {
      const result: Record<string, number[][]> =
        await getAttributeAvgDataOnCities(
          brandNames,
          "brand_name",
          cities,
          conditions
        );
      return result;
    }

    // Either model & city or brand, model & city got selected
    else if (isBrandSelected && isModelSelected && isCitySelected) {
      const result: Record<string, number[][]> =
        await getAttributeAvgDataOnCities(
          modelNames,
          "model_name",
          cities,
          conditions
        );
      return result;
    }

    // Only car conditons selected
    else if (
      !isBrandSelected &&
      !isModelSelected &&
      !isCitySelected &&
      conditions.length
    ) {
      console.log("only conditions is selected");
      return thunkApi.rejectWithValue("INVALID_SELECTION");
    }

    // Nothing got selected
    else if (!isBrandSelected && !isModelSelected && !isCitySelected) {
      console.log("Nothing selected");
      return {};
    }
  }
);
