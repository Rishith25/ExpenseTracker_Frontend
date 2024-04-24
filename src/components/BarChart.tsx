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

  return (
    <Bar
      ref={chartRef}
      data={chartData}
      options={{
        plugins: {
          legend: {
            align: "end",
            position: "top",
            labels: {
              color: "black", // Legend label color
              font: {
                size: 12,
                weight: "bold",
              },
            },
          },
          title: {
            display: true,
            text: "Analytics",
            color: "#333", // Title color
            font: {
              size: 18, // Font size for title
              weight: "bold", // Font weight for title
            },
          },
        },
        elements: {
          line: {
            tension: 0.4,
            borderWidth: 2,
            backgroundColor: "rgba(76, 175, 80, 175)", // Transparent background color for the line
          },
          point: {
            radius: 4,
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: "#4CAF50",
          },
        },
        scales: {
          x: {
            grid: {
              display: false, // Hide vertical grid lines
            },
            ticks: {
              color: "#777", // X-axis label color
              font: {
                size: 12, // Font size for X-axis labels
                weight: "bold", // Font weight for X-axis labels
              },
            },
          },
          y: {
            grid: {
              color: "#f0f0f0", // Color of horizontal grid lines
            },
            ticks: {
              color: "#777", // Y-axis label color
              font: {
                size: 12, // Font size for Y-axis labels
                weight: "bold", // Font weight for Y-axis labels
              },
            },
          },
        },
        maintainAspectRatio: true, // Maintain aspect ratio
        responsive: true, // Make the chart responsive
        aspectRatio: 3, // Set aspect ratio for width and height
      }}
    />
  );
};

export default BarChart;
