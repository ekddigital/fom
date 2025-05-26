"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  TooltipItem,
} from "chart.js";
import { ProgressStatus } from "@prisma/client";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface ProgressData {
  status: ProgressStatus;
  count: number;
}

interface ProgressChartProps {
  data: ProgressData[];
  subjectName?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, subjectName }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: !!subjectName,
        text: subjectName
          ? `${subjectName} Progress Overview`
          : "Progress Overview",
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"doughnut">) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            const value =
              typeof context.parsed === "number" ? context.parsed : 0;

            if (value !== null) { // Check for null explicitly, though context.parsed should be number or 0
              label += value;
            }
            const statusLabel = context.label || "";

            const datasetData = (context.dataset.data || []) as number[];
            const total = datasetData.reduce(
              (acc: number, val: number) => acc + val,
              0
            );
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${statusLabel}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Ensure data is not empty or all counts are zero to prevent Chart.js errors and misleading chart
  if (!data || data.length === 0 || data.every((d) => d.count === 0)) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No progress data available to display chart.
      </div>
    );
  }

  // Order data to ensure consistent color mapping for statuses
  const statusOrder: ProgressStatus[] = [
    ProgressStatus.NOT_STARTED,
    ProgressStatus.IN_PROGRESS,
    ProgressStatus.COMPLETED,
  ];

  const orderedData = statusOrder.map(status => {
    const found = data.find(d => d.status === status);
    return found || { status: status, count: 0 };
  });
  // Filter out statuses that might not be in ProgressStatus enum if data source is less strict,
  // or if you only want to show these three.
  // For now, assuming `data` prop will only contain these statuses or they are handled upstream.


  const finalChartData = {
    labels: orderedData.map(
      (d) =>
        d.status.charAt(0).toUpperCase() +
        d.status.slice(1).toLowerCase().replace("_", " ")
    ),
    datasets: [
      {
        label: "Topic Status",
        data: orderedData.map((d) => d.count),
        backgroundColor: [
          "rgba(239, 68, 68, 0.7)", // NOT_STARTED (red)
          "rgba(234, 179, 8, 0.7)", // IN_PROGRESS (yellow)
          "rgba(34, 197, 94, 0.7)", // COMPLETED (green)
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(34, 197, 94, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-card">
      <div style={{ position: "relative", height: "300px", width: "100%" }}> {/* Ensure container has dimensions */}
        <Doughnut data={finalChartData} options={options} />
      </div>
    </div>
  );
};

export default ProgressChart;