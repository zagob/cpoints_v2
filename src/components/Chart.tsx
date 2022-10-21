import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useContext } from "react";
import { ContextCalendarProvider } from "../contexts/ContextCalendarProvider";

const ChartAp = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function Chart() {
  const { totalDataBonusMinutes } = useContext(ContextCalendarProvider);
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },
      foreColor: "#fff",
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    // colors: ["#000"],
    tooltip: {
      enabled: true,
      fillSeriesColor: true,
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        color: "#ccc",
      },
      labels: {
        datetimeFormatter: {
          month: "MMMM",
        },
      },
      axisTicks: {
        color: "#ccc",
      },

      categories: [
        "2022-01-01T00:00:00.000Z",
        "2022-02-01T00:00:00.000Z",
        "2022-03-01T00:00:00.000Z",
        "2022-04-01T00:00:00.000Z",
        "2022-05-01T00:00:00.000Z",
        "2022-06-01T00:00:00.000Z",
        "2022-07-01T00:00:00.000Z",
        "2022-08-01T00:00:00.000Z",
        "2022-09-01T00:00:00.000Z",
        "2022-10-01T00:00:00.000Z",
        "2022-11-01T00:00:00.000Z",
        "2022-12-30T00:00:00.000Z",
      ],
    },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
  };

  const series = [
    {
      name: "series1",
      data: totalDataBonusMinutes as [],
    },
  ];
  return (
    <div>
      <ChartAp options={options} series={series} type="area" height={250} />
    </div>
  );
}
