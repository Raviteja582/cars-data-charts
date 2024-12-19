import { createAsyncThunk } from "@reduxjs/toolkit";
import db from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const fetchCarsInformation = createAsyncThunk<
  { brands: []; models: []; cities: [] },
  void
>("fetchCarsInformation", async () => {
  try {
    const docRef = doc(db, "metrics", "carsInformation");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as { brands: []; models: []; cities: [] };
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    console.error("fetching metrics error: ", error);
    throw new Error("Error fetching car information: ");
  }
});
