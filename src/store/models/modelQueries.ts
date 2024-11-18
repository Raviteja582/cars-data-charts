import {
  query,
  collection,
  where,
  limit,
  orderBy,
  FieldPath,
  getDocs,
} from "firebase/firestore";
import db from "../firebase";
import { chunk } from "lodash";

export const MAX_QUERY_LIMIT_EXCEEDED = "MaxQueryLimitExceeded";
export const AGG_LIMIT_EXCEEDED = "AggregationLimitExceeded";
export const MAX_LIMIT = 5;

export const carsRef = collection(db, "cars_db");
export const salesRef = collection(db, "sales_db");

export const getBrandNameWithPrefix = (prefixString: string) =>
  query(
    carsRef,
    orderBy("brand_name"),
    where("brand_name", ">=", prefixString),
    where("brand_name", "<", prefixString + "z"),
    limit(MAX_LIMIT)
  );

export const getModelNameWithPrefix = (prefixString: string) => {
  return query(
    carsRef,
    orderBy("model_name"),
    where("model_name", ">=", prefixString),
    where("model_name", "<", prefixString + "z"),
    limit(MAX_LIMIT)
  );
};

export const getCityNameWithPrefix = (prefixString: string) =>
  query(
    carsRef,
    orderBy("city_name"),
    where("city_name", ">=", prefixString),
    where("city_name", "<", prefixString + "z"),
    limit(MAX_LIMIT)
  );

export const getOneAttributesAvg = async (
  attributes: string[],
  name: string,
  car_conditions: string[]
) => {
  const attributeAvgSaleData: Record<string, number[][]> = {};
  for (let i = 0; i < attributes.length; i++) {
    const attribute_name = attributes[i];

    let carQueryRef = query(
      carsRef,
      where(new FieldPath(name), "==", attribute_name)
    );

    if (car_conditions.length === 1) {
      carQueryRef = query(
        carQueryRef,
        where(new FieldPath("car_condition"), "==", car_conditions[0])
      );
    }

    const results = await getDocs(carQueryRef);

    let car_ids: string[] = [];
    results.forEach((res) => {
      car_ids.push(res.id);
    });

    const batches = chunk(car_ids, 30);
    let sale_data: Record<
      string,
      {
        total_sum: number;
        sales_count: number;
      }
    > = {};

    for (let batch in batches) {
      const saleQueryRef = query(
        salesRef,
        where(new FieldPath("car_id"), "in", batches[batch])
      );
      const sales_record = await getDocs(saleQueryRef);

      sales_record.forEach((res) => {
        const data = res.data();

        if (sale_data[data["date"]]) {
          sale_data[data["date"]].total_sum += data["total_sum"];
          sale_data[data["date"]].sales_count += data["sales_count"];
          // console.log(sale_data[data['date']]);
        } else {
          sale_data[data["date"]] = {
            total_sum: data["total_sum"],
            sales_count: data["sales_count"],
          };
        }
      });
    }

    let lineSeries: number[][] = [];
    Object.keys(sale_data).forEach((key) => {
      const date = key.split("-");
      const year = parseInt(date[0], 10);
      const month = parseInt(date[1], 10);
      const day = parseInt(date[2], 10);

      const datetime = Date.UTC(year, month, day);
      const avg_price =
        Math.round(
          (sale_data[key].total_sum / sale_data[key].sales_count) * 100
        ) / 100;

      lineSeries.push([datetime, avg_price]);
    });

    attributeAvgSaleData[attribute_name] = lineSeries;
  }

  return attributeAvgSaleData;
};

export const getAttributeAvgDataOnCities = async (
  attributes: string[],
  attribute_name: string,
  city_names: string[],
  car_conditions: string[]
) => {
  const attributeAvgOnCityData: Record<string, number[][]> = {};

  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];

    let carQueryRef = query(
      carsRef,
      where(new FieldPath(attribute_name), "==", attribute),
      where(new FieldPath("city_name"), "in", city_names)
    );

    if (car_conditions.length === 1) {
      carQueryRef = query(
        carQueryRef,
        where(new FieldPath("car_condition"), "==", car_conditions[0])
      );
    }

    const car_records = await getDocs(carQueryRef);
    let car_ids: string[] = [];

    car_records.forEach((car) => {
      car_ids.push(car.id);
    });

    const batches = chunk(car_ids, 30);
    const sale_data: Record<
      string,
      {
        total_sum: number;
        sales_count: number;
      }
    > = {};

    for (let batch in batches) {
      const saleQueryRef = query(
        salesRef,
        where(new FieldPath("car_id"), "in", batches[batch])
      );
      const sales_record = await getDocs(saleQueryRef);

      sales_record.forEach((res) => {
        const data = res.data();
        if (sale_data[data["date"]]) {
          sale_data[data["date"]].total_sum += data["total_sum"];
          sale_data[data["date"]].sales_count += data["sales_count"];
          // console.log(sale_data[data['date']]);
        } else {
          sale_data[data["date"]] = {
            total_sum: data["total_sum"],
            sales_count: data["sales_count"],
          };
        }
      });
    }

    const lineSeries: number[][] = [];
    Object.keys(sale_data).forEach((key) => {
      const date = key.split("-");
      const year = parseInt(date[0], 10);
      const month = parseInt(date[1], 10);
      const day = parseInt(date[2], 10);

      const datetime = Date.UTC(year, month, day);
      const avg_price =
        Math.round(
          (sale_data[key].total_sum / sale_data[key].sales_count) * 100
        ) / 100;

      lineSeries.push([datetime, avg_price]);
    });
    attributeAvgOnCityData[attribute] = lineSeries;
  }

  return attributeAvgOnCityData;
};
