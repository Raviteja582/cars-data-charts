import { CircularProgress, Typography } from "@mui/material";
import { BaseSyntheticEvent, useState } from "react";
import AsyncSelect from "react-select/async";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import {
  UserSelectionOptions,
  getModelState,
  setBrands,
  setIDs,
  setModels,
  setTrims,
} from "../../../store/models/modelsStore";
import { MultiValue } from "react-select";
import { capitalize, isEmpty, isEqual, lowerCase } from "lodash";
import {
  fetchBrandNameWithPrefix,
  fetchModelNameWithPrefix,
  fetchTrimNameWithPrefix,
} from "../../../store/models/modelOperations";
import { Prices } from "../../../store/prices/priceStore";
import { fetchCarPricesByIds } from "../../../store/prices/priceOperations";
import { LineChartFromHighChart as LineGraph } from "./LineChartDisplay";

function LineGraphData() {
  const isloading = useSelector<RootState, boolean>(
    (state) => state.prices.isFetchingPrice
  );
  const pricesData = useSelector<RootState, Record<string, Prices>>(
    (state) => state.prices.currentPriceData
  );

  // console.log("price data from store: ", JSON.stringify(pricesData));

  if (isloading) {
    return (
      <div>
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
  const { brand_names, model_names, trim_names, iDs } =
    useSelector(getModelState);

  // console.log("in store detailed: ", brand_name, model_name, trim_name);

  const [brandNames, setBrandNames] = useState<string[]>(brand_names);
  const [modelNames, setModelNames] = useState<string[]>(model_names);
  const [trimNames, setTrimNames] =
    useState<UserSelectionOptions[]>(trim_names);

  const onBrandChange = (newValues: MultiValue<UserSelectionOptions>) => {
    if (newValues.length >= 5) return;
    setBrandNames(() => {
      return newValues.map((val) => val.value);
    });
    if (isEmpty(newValues)) {
      setModelNames([]);
    }
  };

  const onModelChange = (newValues: MultiValue<UserSelectionOptions>) => {
    if (newValues.length >= 5) return;
    setModelNames(() => {
      return newValues.map((val) => val.value);
    });
    if (isEmpty(newValues)) {
      setTrimNames([]);
    }
  };

  const onTrimChange = (newValues: MultiValue<UserSelectionOptions>) => {
    if (newValues.length >= 5) return;
    setTrimNames(() => {
      return newValues as UserSelectionOptions[];
    });
  };

  const getUserInputBrandNames = async (inputValue: string) => {
    // console.log('searched string', inputValue);
    if (inputValue === "") return [];
    const results = await dispatch(
      fetchBrandNameWithPrefix(lowerCase(inputValue))
    ).unwrap();
    // console.log("inside component: ", results);
    return results;
  };

  const getUserInputTrimNames = async (inputValue: string) => {
    // console.log('searched string', inputValue);
    if (inputValue === "") return [];
    const results = await dispatch(
      fetchTrimNameWithPrefix({
        prefixString: lowerCase(inputValue),
        brandNames,
        modelNames,
      })
    ).unwrap();
    return results;
  };

  const getUserInputModelNames = async (inputValue: string) => {
    // console.log('searched string', inputValue);
    if (inputValue === "") return [];
    const results = await dispatch(
      fetchModelNameWithPrefix({
        prefixString: lowerCase(inputValue),
        brandNames,
      })
    ).unwrap();
    // console.log("inside component: ", results);
    return results;
  };

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    const currenrIds = trimNames.map((val) => val.id);
    console.log("selected trims: ", currenrIds);
    console.log("prev ids: ", iDs);

    if (isEqual(iDs, currenrIds)) return;

    dispatch(setModels(modelNames));
    dispatch(setBrands(brandNames));
    dispatch(setTrims(trimNames));
    dispatch(setIDs(currenrIds));
    dispatch(fetchCarPricesByIds(currenrIds));
  };

  return (
    <div className="grid grid-cols-4 gap-5">
      <div>
        <Typography>Brand Name:</Typography>
        <div>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={getUserInputBrandNames}
            onChange={onBrandChange}
            isClearable={true}
            isMulti
            value={[
              ...brandNames.map((val) => ({
                label: capitalize(val),
                value: val,
              })),
            ]}
          />
        </div>
      </div>
      <div>
        <Typography>Model Name:</Typography>
        <div>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={getUserInputModelNames}
            onChange={onModelChange}
            isClearable={true}
            isMulti
            isDisabled={isEmpty(brandNames)}
            value={[
              ...modelNames.map((val) => ({
                label: capitalize(val),
                value: val,
              })),
            ]}
          />
        </div>
      </div>
      <div>
        <Typography>Trim Name:</Typography>{" "}
        <div>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={getUserInputTrimNames}
            onChange={onTrimChange}
            isClearable={true}
            isMulti
            isDisabled={isEmpty(brandNames) || isEmpty(modelNames)}
            value={[
              ...trimNames,
              // .map((val) => ({
              //   label: capitalize(val.value),
              //   value: val.value,
              // })),
            ]}
          />
        </div>
      </div>
      <button onClick={handleSubmit} className="border-2">
        Submit
      </button>
    </div>
  );
}

export default function LineChartIcon() {
  return (
    <div>
      <div className="mt-5">
        <Typography>Price Chart For A Brand</Typography>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <UserSelectionComponent/>
        </div>
        <div className="col-span-3">
          <LineGraphData />
        </div>
      </div>
    </div>
  );
}
