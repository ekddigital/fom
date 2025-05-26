// app/teacher/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { checkRole } from "@/lib/auth";
import { Role } from "@prisma/client";

export default async function TeacherPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const isTeacher = await checkRole(Role.TEACHER);
  if (!isTeacher) {
    // If not a teacher, redirect to their default dashboard or home
    // For now, redirecting to home, but you might want a specific student dashboard
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Teacher Dashboard
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Welcome, {user.firstName || user.username || "Teacher"}! This is your
        dedicated space to manage classes, view student progress, and access
        teaching tools.
      </p>
      {/* Add Teacher-specific components and content here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Card 1: View Class Analytics */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Class Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            View aggregate reports on class-wide performance, identify
            struggling students, and track overall progress.
          </p>
          <a
            href="/teacher/analytics"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Go to Analytics
          </a>
        </div>

        {/* Example Card 2: Manage Assignments (Placeholder) */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Manage Assignments
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create, distribute, and grade assignments for your students.
          </p>
          <a
            href="/teacher/assignments"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Manage Assignments
          </a>
        </div>

        {/* Example Card 3: Student Communication (Placeholder) */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Student Communication
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Send announcements or messages to your students.
          </p>
          <a
            href="/teacher/communication"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Communicate with Students
          </a>
        </div>
      </div>
      {/* More teacher-specific content can be added here */}
    </div>
  );
}
