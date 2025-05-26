// app/admin/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { checkRole } from "@/lib/auth"; // Assuming checkRole can be used server-side or adapted
import { Button } from "@/components/ui/button";

export default async function AdminDashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
    return null;
  }

  // Clerk's user object might have publicMetadata or unsafeMetadata for roles
  // For this example, I'm assuming checkRole can determine if the user is an ADMIN
  // You might need to adjust how you get the role, e.g., from your DB via user.id
  const isAdmin = await checkRole(["ADMIN"]); // This needs to correctly use the user's session

  if (!isAdmin) {
    // If not an admin, redirect to the main dashboard or show an unauthorized message
    // For simplicity, redirecting to the main dashboard.
    // You might want a more specific unauthorized page or message.
    redirect("/dashboard");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            View, edit, and manage user accounts and roles.
          </p>
          <Link href="/admin/users">
            <Button variant="outline">Manage Users</Button>
          </Link>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Subject Management</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Create, edit, and manage subjects in the curriculum.
          </p>
          <Link href="/admin/subjects">
            <Button variant="outline">Manage Subjects</Button>
          </Link>
        </div>
        {/* Add more admin sections here as needed, e.g., Chapter Management, Topic Management */}
      </div>
    </div>
  );
}
