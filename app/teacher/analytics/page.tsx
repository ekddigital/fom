// app/teacher/analytics/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Bar } from "react-chartjs-2";
import Link from "next/link"; // Import Link
import { Button } from "@/components/ui/button"; // Import Button
import { ArrowLeft } from "lucide-react"; // Import an icon for the button

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

interface SubjectBreakdown {
  subjectId: string;
  subjectTitle: string;
  averageCompletion: number;
  studentsStrugglingInSubject: number;
  studentsStrugglingThreshold: number;
}

interface StudentNeedingAttention {
  studentId: string;
  studentName: string | null;
  overallCompletion: number;
}

interface ClassSummaryData {
  totalStudents: number;
  overallAverageCompletion: number;
  studentsNeedingAttentionCount: number;
  studentsNeedingAttentionThreshold: number;
  subjectBreakdown: SubjectBreakdown[];
  detailedStudentsNeedingAttention: StudentNeedingAttention[];
}

export default function ClassAnalyticsPage() {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const [summaryData, setSummaryData] = useState<ClassSummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartKey, setChartKey] = useState(0); // For re-rendering chart on theme change

  useEffect(() => {
    const fetchData = async () => {
      if (!isSignedIn) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const token = await getToken();
        const response = await fetch("/api/teacher/analytics/class-summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to fetch class summary data"
          );
        }
        const data: ClassSummaryData = await response.json();
        setSummaryData(data);
      } catch (err) {
        console.error("Error fetching class summary:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoaded) {
      fetchData();
    }
  }, [isSignedIn, isLoaded, getToken]);

  // Effect to update chart on theme change
  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          setChartKey((prevKey) => prevKey + 1); // Force re-render
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  if (!isLoaded || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Loading class analytics...
        </p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-red-500 dark:text-red-400">
          You must be signed in to view this page.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-red-500 dark:text-red-400">
          Error loading data: {error}
        </p>
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          No analytics data available.
        </p>
      </div>
    );
  }

  const subjectPerformanceChartData = {
    labels: summaryData.subjectBreakdown.map((s) => s.subjectTitle),
    datasets: [
      {
        label: "Average Completion %",
        data: summaryData.subjectBreakdown.map((s) => s.averageCompletion),
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Students Struggling",
        data: summaryData.subjectBreakdown.map(
          (s) => s.studentsStrugglingInSubject
        ),
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const isDarkMode = document.documentElement.classList.contains("dark");
  const tickColor = isDarkMode ? "white" : "black";
  const gridColor = isDarkMode
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.1)";

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: tickColor,
        },
      },
      title: {
        display: true,
        text: "Subject Performance Overview",
        color: tickColor,
      },
      tooltip: {
        titleColor: tickColor,
        bodyColor: tickColor,
        backgroundColor: isDarkMode
          ? "rgba(0,0,0,0.8)"
          : "rgba(255,255,255,0.8)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        // max: 100, // Let chart.js determine max based on data, or set dynamically
        ticks: {
          color: tickColor,
        },
        grid: {
          color: gridColor,
        },
      },
      x: {
        ticks: {
          color: tickColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Class Analytics
        </h1>
        <Link href="/teacher" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Teacher Dashboard
          </Button>
        </Link>
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Overview of your class performance and engagement.
      </p>

      {/* Overall Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Total Students
          </h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">
            {summaryData.totalStudents}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Avg. Class Completion
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            {summaryData.overallAverageCompletion.toFixed(2)}%
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Students Needing Attention
          </h3>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
            {summaryData.studentsNeedingAttentionCount}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            (Below {summaryData.studentsNeedingAttentionThreshold}% overall)
          </p>
        </div>
      </div>

      {/* Subject Breakdown Table & Chart */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Subject Performance
        </h2>
        {summaryData.subjectBreakdown.length > 0 ? (
          <>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Subject
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Avg. Completion
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Students Struggling
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {summaryData.subjectBreakdown.map((subject) => (
                    <tr key={subject.subjectId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {subject.subjectTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {subject.averageCompletion.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {subject.studentsStrugglingInSubject}
                        <span className="text-xs ml-1">
                          (Below {subject.studentsStrugglingThreshold}%)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 h-96 w-full">
              <Bar
                key={chartKey}
                data={subjectPerformanceChartData}
                options={chartOptions}
              />
            </div>
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No subject data available to display chart.
          </p>
        )}
      </div>

      {/* Students Needing Attention List */}
      {summaryData.detailedStudentsNeedingAttention.length > 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Students to Watch
          </h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {summaryData.detailedStudentsNeedingAttention.map((student) => (
              <li
                key={student.studentId}
                className="py-3 flex justify-between items-center"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {student.studentName || "Unnamed Student"} (
                  {student.studentId})
                </span>
                <span className="text-sm text-red-500 dark:text-red-400">
                  Overall: {student.overallCompletion.toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
