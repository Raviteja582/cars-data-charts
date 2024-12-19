import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import { PriceData } from "./priceStore";
import { RootState } from "store/store";
import { isNil } from "lodash";

export const fetchPrices = createAsyncThunk<
  { output: Record<string, Array<[number, number]>>; key: string },
  {
    selectedFilter: string;
    carConditions: string | "new" | "used" | "all";
    selectedPriceOptions: string[];
  }
>(
  "prices/fetchCarPricesById",
  async (
    { selectedFilter, carConditions, selectedPriceOptions },
    { getState }
  ) => {
    let dbName = "";
    const state: RootState = getState() as RootState;
    const prices = state.prices;
    let finalList: string[] = [];
    let entityRecord: Record<string, Array<[number, number]>> = {};

    if (selectedFilter === "brands") {
      dbName = "brand_db";
      entityRecord = prices.brands;
    } else if (selectedFilter === "models") {
      dbName = "models_db";
      entityRecord = prices.models;
    } else {
      dbName = "city_db";
      entityRecord = prices.cities;
    }

    selectedPriceOptions.forEach((option) => {
      if (isNil(entityRecord[option])) finalList.push(option);
    });

    const promises = finalList.map((id) => {
      console.log(dbName, id);
      const docRef = doc(db, dbName, id);
      return getDoc(docRef);
    });

    const docs = await Promise.all(promises);
    const output: Record<string, Record<string, PriceData>> = {};
    docs.forEach((docSnap) => {
      if (docSnap.exists()) {
        console.log(`Document ID: ${docSnap.id}`, docSnap.data());
        output[docSnap.id] = docSnap.data() as Record<string, PriceData>;
      }
    });

    console.log("firebase output: ", output);
    let formattedOutput = filterAndFormatPricesData(output, carConditions);
    console.log("Chart formatted data: ", formattedOutput);
    return {
      output: formattedOutput,
      key: selectedFilter,
    };
  }
);

export const filterAndFormatPricesData = (
  prices: Record<string, Record<string, PriceData>>,
  conditions: string | "new" | "used" | "all"
): Record<string, Array<[number, number]>> => {
  let output: Record<string, Array<[number, number]>> = {};

  Object.keys(prices).forEach((brandName: string) => {
    output[brandName] = [];
    Object.keys(prices[brandName]).forEach((date) => {
      const dates = date.split("-");
      const year = parseInt(dates[0], 10);
      const month = parseInt(dates[1], 10);
      const day = parseInt(dates[2], 10);

      const datetime = Date.UTC(year, month, day);
      const data = prices[brandName][date];
      let value = undefined;
      if (conditions === "new") {
        value = data["new_avg_price"];
      } else if (conditions === "used") {
        value = data["used_avg_price"];
      } else {
        value = data["total_avg_price"];
      }

      output[brandName].push([datetime, value]);
    });
  });

  return output;
};
