/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar } from "react-chartjs-2";
import React, { useEffect, useRef } from "react";
import {} from "chart.js/auto";

const BarChart: React.FC<{ chartData: any }> = ({ chartData }) => {
  const chartRef = useRef<any>();

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
    }
  }, [chartData]);

  return <Bar ref={chartRef} data={chartData} />;
};

export default BarChart;
