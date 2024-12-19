import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAttributeAvgDataOnCities,
  getOneAttributesAvg,
} from "./modelQueries";
import { isEmpty } from "lodash";

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
