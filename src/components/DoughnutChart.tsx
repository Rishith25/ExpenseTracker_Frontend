/* eslint-disable @typescript-eslint/no-explicit-any */
import { Doughnut } from "react-chartjs-2";
import React, { useEffect, useRef } from "react";

const DoughnutChart: React.FC<{ chartData: any }> = ({ chartData }) => {
  const chartRef = useRef<any>();

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
    }
  }, [chartData]);

  return (
    <Doughnut
      ref={chartRef}
      data={chartData}
      options={{
        plugins: {
          legend: {
            display: true,
            position: "right",
            labels: {
              color: "black",
              font: {
                size: 12,
                weight: "bold",
              },
            },
          },
          title: {
            display: true,
            text: "Monthly Income and Expenses",
            color: "#333",
            font: {
              size: 18,
              weight: "bold",
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
      }}
    />
  );
};

export default DoughnutChart;
