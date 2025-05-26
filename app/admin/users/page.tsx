"use client";

import { useEffect, useState } from "react";
import { Role } from "@prisma/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Define a more specific type for the user data received from the API
interface ApiUser {
  id: string;
  clerk_id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: Role;
  created_at: string; // Dates are often serialized as strings
  updated_at: string;
}

export default function AdminUserManagementPage() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({
            error: `Failed to fetch users: ${response.statusText}`,
          }));
          throw new Error(
            errorData.error || `Failed to fetch users: ${response.statusText}`
          );
        }
        const data = await response.json();
        setUsers(data as ApiUser[]);
      } catch (err) {
        let message = "An unknown error occurred while fetching users.";
        if (err instanceof Error) {
          message = err.message;
        }
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: Role) => {
    try {
      const response = await fetch(`/api/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Failed to update role" }));
        throw new Error(
          errorData.error || `Failed to update role: ${response.statusText}`
        );
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      toast.success("Role updated successfully!");
    } catch (err) {
      let message = "Error updating role.";
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message); // Keep setting local error state if needed for other UI elements
      toast.error(message);
    }
  };

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading users...</p>
      </div>
    );
  // We can show a more specific error message if the fetch failed,
  // or rely on the toast notification and show a generic message here.
  if (error && users.length === 0)
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Error loading users: {error}</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin - User Management</h1>

      {users.length === 0 && !isLoading ? (
        <p>No users found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {/* You can use the Avatar component here if you want */}
                    {/* <Avatar>
                      <AvatarImage src={user.avatar_url || undefined} alt={user.name || user.email} />
                      <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar> */}
                    <div>{user.name || "N/A"}</div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === Role.ADMIN
                        ? "bg-red-100 text-red-800"
                        : user.role === Role.TEACHER
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800" // STUDENT
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onValueChange={(newRole: Role) =>
                      handleRoleChange(user.id, newRole)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Role).map((roleValue) => (
                        <SelectItem key={roleValue} value={roleValue}>
                          {roleValue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
