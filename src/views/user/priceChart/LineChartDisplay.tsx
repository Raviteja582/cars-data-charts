import { monthToInt } from "helpers/dates";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useCallback, useState } from "react";
import { Prices } from "store/prices/priceStore";
import { chartData } from "./data";

export const LineChartFromHighChart = ({
  data,
}: {
  data: Record<string, Prices>;
}) => {
  const carPriceFormat =
    useCallback((): Array<Highcharts.SeriesOptionsType> => {
      // const lineSeries = {
      //   type: "line",
      //   name: "",
      //   tooltip: {
      //     valueDecimals: 2,
      //   },
      //   data: carPriceFormat(),
      //   marker: {
      //     enabled: true, // Enable markers
      //     radius: 4, // Set the radius of the markers
      //     fillColor: "#FF0000", // Set the fill color of the markers
      //     lineWidth: 2, // Set the line width of the marker border
      //     lineColor: "#FFFFFF", // Set the line color of the marker border
      //   },
      // };

      const lineSeries: Array<Highcharts.SeriesOptionsType> = [];

      Object.keys(data).forEach((carId: string) => {
        const prices = data[carId]; // Prices
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
          name: carId,
          tooltip: {
            valueDecimals: 2,
          },
          data: chartData,
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
    }, [data]);

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
    series: [
      {
        showInLegend: true,
        type: "line",
        name: "sample",
        tooltip: {
          valueDecimals: 2,
        },
        data: chartData,
        marker: {
          enabled: true, // Enable markers
          radius: 4, // Set the radius of the markers
          // fillColor: "#FF0000", // Set the fill color of the markers
          // lineWidth: 2, // Set the line width of the marker border
          // lineColor: "#FFFFFF", // Set the line color of the marker border
        },
      },
    ],
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
