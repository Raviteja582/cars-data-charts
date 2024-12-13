import { CircularProgress, Typography } from "@mui/material";
import { BaseSyntheticEvent, useCallback, useState } from "react";
import AsyncSelect from "react-select/async";
import { ActionMeta } from "react-select";
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
import Card from "components/card";
import { Select } from "components/react-select";
import { getBrandNameWithPrefix } from "store/models/modelQueries";

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
        <LineGraph data={{}} />
    );
  } else {
    return (
        <LineGraph data={pricesData} />
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

  const [customStyles, _] = useState({
    control: (base: any, state: any) => ({
      ...base,
      width: 300, // Adjust width as needed
      minHeight: 30, // Adjust height as needed
      overflowY: "auto",
    }),
  });

  return (
    <div className="flex flex-wrap justify-evenly">
      <div>
        <Typography>Brand Names: </Typography>
        <Select
          value={brandNames}
          name={"brand_name"}
          onChange={onSelectChange}
          styles={customStyles}
          loadOptions={getUserInputBrandNames}
        />
      </div>
      <div>
        <Typography>Model Names: </Typography>
        <Select
          value={modelNames}
          name={"model_name"}
          onChange={onSelectChange}
          loadOptions={getUserInputModelNames}
          styles={customStyles}
        />
      </div>
      <div>
        <Typography>City Names: </Typography>
        <Select
          value={cityNames}
          name={"city_name"}
          onChange={onSelectChange}
          loadOptions={getUserInputCityNames}
          styles={customStyles}
        />
      </div>
      <div>
        <div>
          <Typography>Car Conditions:</Typography>
          <Select
            name={"car_condition"}
            options={[
              { value: "New", label: "New" },
              { value: "Used", label: "Used" },
            ]}
            onChange={onSelectChange}
            styles={customStyles}
          />
        </div>
      </div>
      <div>
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
    <Card extra="!p-[20px] text-center ml-4 w-full h-full">
      <UserSelectionComponent />
      <div className="min-h-full w-full flex-grow">
        <LineGraphData />
      </div>
    </Card>
  );
}
