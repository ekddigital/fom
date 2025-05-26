// app/dashboard/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SubjectList from "@/components/dashboard/SubjectList"; // Import the SubjectList component
import ProgressChart from "@/components/dashboard/ProgressChart"; // Import the ProgressChart component
import { ProgressStatus } from "@prisma/client"; // Import ProgressStatus

// Define types needed for data fetching and transformation
// Ideally, these would be in a shared types file
interface UserProgressItem {
  status: ProgressStatus;
  // other fields from API response are not strictly needed for this transformation
}

interface ProgressData {
  status: ProgressStatus;
  count: number;
}

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    // This should ideally be handled by middleware,
    // but as a safeguard, redirect if no user.
    redirect("/sign-in");
    return null; // Important to return null after redirect
  }

  let overallProgressData: ProgressData[] = [];
  try {
    // Construct an absolute URL for the API call
    const host =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.VERCEL_URL ||
      "localhost:3000"; // Ensure a default host
    const protocol = host.startsWith("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host.replace(/^https?:\/\//, "")}`;
    const progressApiUrl = new URL(
      `/api/users/${user.id}/progress`,
      baseUrl
    ).toString();

    // Fetch data from the API route. Added cache: 'no-store' to ensure fresh data.
    const progressResponse = await fetch(progressApiUrl, {
      cache: "no-store",
    });

    if (progressResponse.ok) {
      const rawProgressItems: UserProgressItem[] =
        await progressResponse.json();

      // Initialize counts for all relevant statuses to ensure they are represented
      const progressCounts: { [key in ProgressStatus]?: number } = {
        [ProgressStatus.NOT_STARTED]: 0,
        [ProgressStatus.IN_PROGRESS]: 0,
        [ProgressStatus.COMPLETED]: 0,
      };

      for (const item of rawProgressItems) {
        // Ensure the status from item is a valid key of progressCounts
        if (item.status && progressCounts.hasOwnProperty(item.status)) {
          progressCounts[item.status] = (progressCounts[item.status] ?? 0) + 1;
        }
      }

      overallProgressData = Object.entries(progressCounts).map(
        ([status, count]) => ({
          status: status as ProgressStatus,
          count: count as number,
        })
      );
      // ProgressChart handles statuses with 0 count, so no need to filter them here.
    } else {
      console.error(
        `Failed to fetch progress data for chart: ${progressResponse.status} ${progressResponse.statusText}`
      );
      // overallProgressData will remain empty or default, ProgressChart will show "No progress data"
    }
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error(
      "Error fetching or processing progress data for chart:",
      error
    );
    // overallProgressData will remain empty or default
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your Learning Dashboard</h1>
      <p className="mb-6">
        Welcome back, {user.firstName || user.username}! Here is your overall
        progress and subjects:
      </p>
      {/* Render the ProgressChart component, passing the transformed data and removing userId */}
      <ProgressChart data={overallProgressData} />
      <h2 className="text-xl font-semibold my-6">Your Subjects</h2>{" "}
      {/* Adjusted heading and margin */}
      {/* Render the SubjectList component */}
      <SubjectList />
      {/* Add more dashboard content here later */}
    </div>
  );
}
