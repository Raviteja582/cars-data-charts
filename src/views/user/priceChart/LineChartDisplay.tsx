import { monthToInt } from "helpers/dates";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useCallback, useState } from "react";
import { Prices } from "store/prices/priceStore";
import { chartData } from "./data";
import { useSelector } from "react-redux";
import { getModelState } from "store/models/modelsStore";

export const LineChartFromHighChart = ({
  data,
}: {
  data: Record<string, Prices>;
}) => {
  const { brand_names, model_names, trim_names } = useSelector(getModelState);

  const carPriceFormat =
    useCallback((): Array<Highcharts.SeriesOptionsType> => {
      const lineSeries: Array<Highcharts.SeriesOptionsType> = [];

      Object.keys(data).forEach((carId: string, indx: number) => {
        const prices = data[carId]; // Prices
        const brandName = brand_names[indx];
        const modelName = model_names[indx];
        const trimName = trim_names[indx].value;

        let coords: Array<Array<number>> = [];
        Object.keys(prices).forEach((year: string) => {
          const months = prices[year];
          Object.keys(months).forEach((month: string) => {
            const days = (months as any)[month] as number[];
            let price = 0;
            for (var i = 0; i < days.length; i++) {
              price = days[i];
              const date = Date.UTC(+year, monthToInt(month), i);
              coords.push([date, price]);
            }
          });
        });
        coords.sort();
        lineSeries.push({
          showInLegend: true,
          type: "line",
          name: `brand: ${brandName}, model: ${modelName}, trim: ${trimName}`,
          tooltip: {
            valueDecimals: 2,
          },
          data: coords,
          marker: {
            enabled: true, // Enable markers
            radius: 4, // Set the radius of the markers
            // fillColor: "#FF0000", // Set the fill color of the markers
            // lineWidth: 2, // Set the line width of the marker border
            // lineColor: "#FFFFFF", // Set the line color of the marker border
          },
        });
      });
      return lineSeries;
    }, [data, brand_names, model_names, trim_names]);

  const [options] = useState<Highcharts.Options>({
    title: {
      text: "Price Chart",
    },
    legend: {
      layout: "vertical",
      align: "center",
      verticalAlign: "bottom",
      floating: false,
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: 1,
      enabled: true,
    },
    rangeSelector: {
      selected: 1,
    },
    tooltip: {
      shared: true,
    },
    yAxis: [
      {
        labels: {
          align: "left",
          formatter: function () {
            return "$" + ((this.value as number) / 1000).toFixed(2) + "K"; // Format the y-axis labels to include a dollar sign and two decimal places
          },
        },
        height: "100%",
        resize: {
          enabled: true,
        },
        title: {
          text: "Car Price",
        },
      },
    ],
    navigator: {
      enabled: false,
    },
    scrollbar: {
      enabled: true,
    },
    series: carPriceFormat(),
    chart: {
      height: "35%",
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <div id="container">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          constructorType={"stockChart"}
        />
      </div>
    </div>
  );
};
