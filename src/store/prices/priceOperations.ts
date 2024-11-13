import { createAsyncThunk } from "@reduxjs/toolkit";
import { Prices } from "./priceStore";
import { getCarPriceQuery } from "./priceQueries";
import { getDoc } from "firebase/firestore";

export const fetchCarPricesByIds = createAsyncThunk<
  Record<string, Prices>,
  string[]
>("prices/fetchCarPricesById", async (carIds: string[]) => {
  // console.log("price of carsId: ", carIds);
  const promises = carIds.map(async (id) => {
    const docSnap = await getDoc(getCarPriceQuery(id));

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return [] as any; // Handle cases where the document doesn't exist
    }
  });

  const results = await Promise.all(promises);
  const finalResult: Record<string, Prices> = {};
  results.forEach((prices, indx) => {
    finalResult[carIds[indx]] = prices;
  });
  console.log("final Prices: ", results);
  return finalResult;
});
