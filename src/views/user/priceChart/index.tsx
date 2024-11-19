import { CircularProgress, Typography } from "@mui/material";
import { BaseSyntheticEvent, useCallback, useState } from "react";
import AsyncSelect from "react-select/async";
import Select, { ActionMeta } from "react-select";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { UserSelectionOptions } from "../../../store/models/modelsStore";
import { MultiValue } from "react-select";
import { capitalize, isEmpty, some } from "lodash";
import {
  fetchBrandNameWithPrefix,
  fetchCarPrices,
  fetchCityNameWithPrefix,
  fetchModelNameWithPrefix,
} from "../../../store/models/modelOperations";
import { LineChartFromHighChart as LineGraph } from "./LineChartDisplay";
import "./style.css";

function LineGraphData() {
  const isloading = useSelector<RootState, boolean>(
    (state) => state.models.isLoading
  );
  const pricesData = useSelector<RootState, Record<string, number[][]>>(
    (state) => state.models.lineSeries
  );

  console.log("price data from store: ", JSON.stringify(pricesData));

  if (isloading) {
    return (
      <div className="m-0 p-0">
        <CircularProgress size="10rem" />
      </div>
    );
  } else if (!isloading && isEmpty(pricesData)) {
    return (
      <div>
        <LineGraph data={{}} />;
      </div>
    );
  } else {
    return (
      <div>
        <LineGraph data={pricesData} />
      </div>
    );
  }
}

function UserSelectionComponent() {
  const dispatch = useAppDispatch();

  const [brandNames, setBrandNames] = useState<UserSelectionOptions[]>([]);
  const [modelNames, setModelNames] = useState<UserSelectionOptions[]>([]);
  const [cityNames, setCityNames] = useState<UserSelectionOptions[]>([]);
  const [carConditions, setCarConditions] = useState<UserSelectionOptions[]>(
    []
  );

  const getUserInputBrandNames = useCallback(
    async (inputValue: string) => {
      console.log("searched string", inputValue);
      if (inputValue === "") return [];
      const results = await dispatch(
        fetchBrandNameWithPrefix(inputValue)
      ).unwrap();
      console.log("inside component: ", results);
      return results;
    },
    [dispatch]
  );

  const getUserInputModelNames = useCallback(
    async (inputValue: string) => {
      console.log("searched string", inputValue);
      if (inputValue === "") return [];
      const results = await dispatch(
        fetchModelNameWithPrefix({
          prefixString: inputValue,
        })
      ).unwrap();
      console.log("inside component: ", results);
      return results;
    },
    [dispatch]
  );

  const getUserInputCityNames = useCallback(
    async (inputValue: string) => {
      console.log("searched string", inputValue);
      if (inputValue === "") return [];
      const results = await dispatch(
        fetchCityNameWithPrefix({
          prefixString: inputValue,
        })
      ).unwrap();
      console.log("inside component: ", results);
      return results;
    },
    [dispatch]
  );

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    dispatch(
      fetchCarPrices({
        brandNames: brandNames.map((brand) => brand.value),
        modelNames: modelNames.map((model) => model.value),
        cities: cityNames.map((city) => city.value),
        conditions: carConditions.map((condition) => condition.value),
      })
    );
  };

  const onSelectChange = useCallback(
    (
      selection: MultiValue<UserSelectionOptions>,
      actionMeta: ActionMeta<any>
    ) => {
      if (actionMeta.name === "brand_name") {
        setBrandNames(() => selection as UserSelectionOptions[]);
        if (!isEmpty(modelNames)) {
          let validModels: UserSelectionOptions[] = [];
          selection.forEach((brand) => {
            modelNames.forEach((model, indx) => {
              if (model.brand_name === brand.value) {
                validModels.push(model);
              }
            });
          });
          setModelNames(() => validModels);
        }
      } else if (actionMeta.name === "model_name") {
        setModelNames(() => selection as UserSelectionOptions[]);
        let notSelectedBrands = new Set<UserSelectionOptions>();
        const currentBrands = brandNames.map((brand) => brand.value);
        console.log("current brands: ", currentBrands);
        selection.forEach((model) => {
          const brands = some(
            currentBrands,
            (brand_name: string) => brand_name === model.brand_name
          );
          console.log(brands);
          if (!brands) {
            notSelectedBrands.add({
              label: capitalize(model.brand_name),
              value: model.brand_name,
            });
          }
        });

        if (!isEmpty(notSelectedBrands)) {
          console.log(notSelectedBrands);
          setBrandNames((prevValue) => {
            prevValue.push(...notSelectedBrands);
            return prevValue;
          });
        }
      } else if (actionMeta.name === "city_name") {
        setCityNames(() => selection as UserSelectionOptions[]);
      } else if (actionMeta.name === "car_condition") {
        setCarConditions(() => selection as UserSelectionOptions[]);
      }
    },
    [brandNames, modelNames]
  );

  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-2 overflow-auto md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-5">
      <div>
        <Typography>Brand Name: </Typography>
        <div>
          <AsyncSelect
            name="brand_name"
            cacheOptions
            defaultOptions
            loadOptions={getUserInputBrandNames}
            onChange={onSelectChange}
            isClearable={true}
            value={brandNames}
            isMulti
            placeholder="ALL"
          />
        </div>
      </div>
      <div>
        <Typography>Model Name: </Typography>
        <div>
          <AsyncSelect
            name="model_name"
            cacheOptions
            defaultOptions
            loadOptions={getUserInputModelNames}
            onChange={onSelectChange}
            isClearable={true}
            isMulti
            value={modelNames}
            placeholder="ALL"
          />
        </div>
      </div>
      <div>
        <Typography>City Name: </Typography>
        <div>
          <AsyncSelect
            name="city_name"
            cacheOptions
            defaultOptions
            loadOptions={getUserInputCityNames}
            onChange={onSelectChange}
            isClearable={true}
            isMulti
            placeholder="ALL"
          />
        </div>
      </div>
      <div className="col-span-1 row-span-1">
        <div>
          <Typography>Car Condition:</Typography>
          <div>
            <Select
              name="car_condition"
              options={[
                { value: "New", label: "New" },
                { value: "Used", label: "Used" },
              ]}
              onChange={onSelectChange}
              isClearable={true}
              isMulti
              placeholder="ALL"
            />
          </div>
        </div>
      </div>
      <div className="col-span-1 row-span-1">
        <div>
          <button
            onClick={handleSubmit}
            className="ml-8 mt-5 border-2 pb-1 pl-8 pr-8 pt-2"
          >
            <Typography>Submit</Typography>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LineChartIcon() {
  return (
    <div>
      <div className="mt-5 h-full">
        <Typography>Price Chart For A Brand</Typography>
      </div>
      <div className="mt-5 grid grid-rows-4 gap-2">
        <div className="h-40 overflow-auto">
          <UserSelectionComponent />
        </div>
        <div className="chart-outer row-span-3 mr-0">
          <div className="chart-inner">
            <LineGraphData />
          </div>
        </div>
      </div>
    </div>
  );
}
