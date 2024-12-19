import { CircularProgress, Typography } from "@mui/material";
import { BaseSyntheticEvent, useCallback, useEffect, useState } from "react";
import { ActionMeta, MultiValue } from "react-select";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { UserSelectionOptions } from "../../../store/models/modelsStore";
import { LineChartFromHighChart as LineGraph } from "./LineChartDisplay";
import "./style.css";
import Card from "components/card";
import Select from "react-select";
import WindowedSelect from "react-windowed-select";
import { isEmpty, isNil, isNull } from "lodash";
import { CarsInformation } from "store/metrics/metricsStore";
import { fetchCarsInformation } from "store/metrics/metricQueries";
import { fetchPrices } from "store/prices/priceOperations";

type Options = {
  brands: UserSelectionOptions[];
  models: UserSelectionOptions[];
  cities: UserSelectionOptions[];
};

function LineGraphData() {
  const isloading = useSelector<RootState, boolean>(
    (state) => state.prices.loading
  );

  const pricesData = useSelector<
    RootState,
    Record<string, Array<[number, number]>>
  >((state) => {
    const prices = state.prices;
    const filter_db = state.prices.filter_name;
    if (filter_db === "brands") return prices.brands;
    else if (filter_db === "models") return prices.models;
    else return prices.cities;
  });

  if (isloading) {
    return (
      <div className="m-0 p-0">
        <CircularProgress size="10rem" />
      </div>
    );
  } else if (!isloading && isEmpty(pricesData)) {
    return <LineGraph data={{}} />;
  } else {
    return <LineGraph data={pricesData} />;
  }
}

function UserSelectionComponent() {
  const dispatch = useAppDispatch();

  const carsInformation = useSelector<RootState, CarsInformation>(
    (state) => state.metrics.carsInformation
  );
  const [carConditions, setCarConditions] = useState<UserSelectionOptions>({
    value: "all",
    label: "ALL",
  });
  const [filterOptions, setFilterOptions] = useState<Options>(null);
  const [selectedFilter, setSelectedFilter] = useState<UserSelectionOptions>({
    label: "",
    value: "",
  });
  const [selectedPriceOptions, setSelectedPriceOptions] = useState<
    UserSelectionOptions[]
  >([]);

  const getFilterOptions = useCallback(
    (selectedFilter: keyof Options) => {
      console.log("selected filter: ", selectedFilter);
      if (isNil(filterOptions) || isEmpty(selectedFilter)) return [];
      console.log(
        "selectedFilter options:",
        filterOptions[selectedFilter].length
      );
      if (filterOptions[selectedFilter]) return filterOptions[selectedFilter];
      return [];
    },
    [filterOptions]
  );

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    console.log(
      "Details: ",
      selectedFilter,
      carConditions,
      selectedPriceOptions
    );
    dispatch(
      fetchPrices({
        selectedFilter: selectedFilter.value,
        selectedPriceOptions: selectedPriceOptions.map(
          (option) => option.value
        ),
        carConditions: carConditions.value,
      })
    );
  };

  const onSelectChange = useCallback(
    (
      selection: MultiValue<UserSelectionOptions> | unknown,
      actionMeta: ActionMeta<any>
    ) => {
      if (actionMeta.name === "car_condition") {
        setCarConditions(() => selection as UserSelectionOptions);
      } else if (actionMeta.name === "filter_names") {
        setSelectedPriceOptions(selection as UserSelectionOptions[]);
      }
    },
    []
  );

  useEffect(() => {
    if (carsInformation.brands.length === 0) {
      dispatch(fetchCarsInformation());
    }
    const processArray = (arr: string[]) =>
      arr.map((str) => {
        const decoded = decodeURIComponent(str); // Convert unicode to normal characters
        const split = decoded.split("_"); // Split the string with '_'
        const capitalized = split
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
          .join(" "); // Join words back to a string
        return { label: capitalized, value: str };
      });

    const options: {
      brands: UserSelectionOptions[];
      models: UserSelectionOptions[];
      cities: UserSelectionOptions[];
    } = {
      brands: [],
      models: [],
      cities: [],
    };
    if (carsInformation.brands) {
      options.brands = processArray(carsInformation.brands);
    }
    if (carsInformation.cities) {
      options.cities = processArray(carsInformation.cities);
    }
    if (carsInformation.models) {
      options.models = processArray(carsInformation.models);
    }

    console.debug("config options: ", options.cities.length);
    setFilterOptions(options);
  }, [carsInformation, dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <div>
          <Typography>Comparison: </Typography>
          <Select
            styles={customStyles}
            value={selectedFilter}
            options={[
              { label: "Brands", value: "brands" },
              { label: "Models", value: "models" },
              { label: "City", value: "cities" },
              { label: "", value: "" },
            ]}
            onChange={(value) => {
              if (value.value === "") {
                setSelectedPriceOptions([]);
                setCarConditions({ value: "all", label: "ALL" });
              }
              setSelectedFilter(value);
            }}
          />
        </div>
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
            isClearable
          />
        </div>
      </div>
      <div>
        <div>
          <Typography>Select Entities:</Typography>
          <WindowedSelect
            isMulti
            onChange={onSelectChange}
            options={getFilterOptions(selectedFilter.value as keyof Options)}
            isDisabled={
              isEmpty(selectedFilter.value) || isNull(selectedFilter.value)
            }
            name={"filter_names"}
            styles={customStyles}
            windowThreshold={100}
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
