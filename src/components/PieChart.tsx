/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pie } from "react-chartjs-2";
import React, { useEffect, useRef } from "react";
import {} from "chart.js/auto";

const PieChart: React.FC<{ chartData: any }> = ({ chartData }) => {
  const chartRef = useRef<any>();

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
    }
  }, [chartData]);

  return <Pie ref={chartRef} data={chartData} />;
};

export default PieChart;
