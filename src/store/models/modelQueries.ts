import { query, collection, where, limit, orderBy } from "firebase/firestore";
import db from "../firebase";

export const modelsRef = collection(db, 'models');

export const getBrandNameWithPrefix = (prefixString: string) =>
  query(
    modelsRef,
    orderBy("brand_name"),
    where("brand_name", ">=", prefixString),
    where("brand_name", "<", prefixString + "z"),
    limit(5)
  );

export const getModelNameWithPrefix = (
  prefixString: string,
  brandNames: string[]
) =>
  query(
    modelsRef,
    where("brand_name", "in", brandNames),
    orderBy("model_name"),
    where("model_name", ">=", prefixString),
    where("model_name", "<", prefixString+"z"),
    limit(5)
  );

export const getTrimNameWithPrefix = (
  prefixString: string,
  brandNames: string[],
  modelNames: string[]
) =>
  query(
    modelsRef,
    where("brand_name", "in", brandNames),
    where("model_name", "in", modelNames),
    orderBy("trim_name"),
    where("trim_name", ">=", prefixString),
    where("trim_name", "<", prefixString+"z"),
    limit(5)
  );
 