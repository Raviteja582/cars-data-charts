import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useCallback, useEffect, useState, useRef } from "react";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import { isEmpty } from "lodash";

NoDataToDisplay(Highcharts);

export const LineChartFromHighChart = ({
  data,
}: {
  data: Record<string, number[][]>;
}) => {
  const chartRef = useRef(null);
  const carPriceFormat =
    useCallback((): Array<Highcharts.SeriesOptionsType> => {
      let lineSeries: Array<Highcharts.SeriesOptionsType> = [];
      Object.keys(data).forEach((name: string) => {
        console.log(name, data[name]);
        if (data[name].length === 0) {
          console.log("No data for name: ", name);
          return;
        }
        let prices = [...data[name]]; // Prices
        prices.sort();
        lineSeries.push({
          showInLegend: true,
          type: "spline",
          name: name,
          tooltip: {
            valueDecimals: 2,
          },
          data: prices,
          // marker: {
          //   enabled: true, // Enable markers
          //   radius: 4, // Set the radius of the markers
          //   // fillColor: "#FF0000", // Set the fill color of the markers
          //   // lineWidth: 2, // Set the line width of the marker border
          //   // lineColor: "#FFFFFF", // Set the line color of the marker border
          // },
        });
      });
      console.log("final: ", lineSeries);
      if (chartRef.current && isEmpty(lineSeries)) {
        const chart = chartRef.current.chart;
        chart.showLoading("No Data Available");
      }
      return lineSeries;
    }, [data]);

  useEffect(() => {
    Highcharts.setOptions({
      lang: {
        noData: "No Data Available",
      },
    });
  }, []);

  const [options] = useState<Highcharts.Options>({
    title: {
      text: "Price Chart",
    },
    chart: {
      height: 500,
    },
    lang: {
      noData: "No Data Available",
    },
    legend: {
      layout: "horizontal",
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
      valueSuffix: " $",
    },
    yAxis: [
      {
        labels: {
          align: "left",
          formatter: function () {
            return "$" + Math.round(this.value as number) / 1000 + "K"; // Format the y-axis labels to include a dollar sign and two decimal places
          },
        },
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
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      constructorType={"stockChart"}
      ref={chartRef}
    />
  );
};
