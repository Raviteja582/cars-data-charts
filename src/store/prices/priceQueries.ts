import { collection, doc } from "firebase/firestore";
import db from "../firebase";

export const pricesRef = collection(db, 'prices');

export const getCarPriceQuery = (carId: string) => doc(db, 'prices', carId);