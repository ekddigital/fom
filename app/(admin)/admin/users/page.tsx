"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useUsers, type User, type UserStats } from "@/lib/hooks/use-users";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
import { useAuth } from "@/lib/hooks/use-auth";

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const { getUsers, updateUser, deleteUser, loading } = useUsers();
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats>({
    total: 0,
    active: 0,
    pending: 0,
    inactive: 0,
    byRole: {},
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadUsers = async () => {
    try {
      const data = await getUsers({
        page: pagination.page,
        limit: pagination.limit,
        search: searchQuery,
        role: roleFilter === "all" ? "" : roleFilter,
        status: statusFilter === "all" ? "" : statusFilter,
      });
      setUsers(data.users);
      setStats(data.stats);
      setPagination(data.pagination);
    } catch {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadUsers();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, roleFilter, statusFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    loadUsers();
  };

  const handleUpdateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      await updateUser(userId, { role: newRole });
      toast.success("User role updated successfully");
      loadUsers();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update user role"
      );
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      toast.success("User deleted successfully");
      loadUsers();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete user"
      );
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString();
  };

  const formatTimeAgo = (date: Date | string) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return "1 day ago";
    } else if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else {
      return formatDate(date);
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-red-100 text-red-800";
      case "ADMIN":
        return "bg-orange-100 text-orange-800";
      case "MINISTRY_LEADER":
        return "bg-purple-100 text-purple-800";
      case "MEMBER":
        return "bg-blue-100 text-blue-800";
      case "VISITOR":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (user: User) => {
    if (!user.emailVerified) {
      return "bg-yellow-100 text-yellow-800";
    }

    const daysSinceActive = Math.floor(
      (new Date().getTime() - new Date(user.lastActive).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (daysSinceActive <= 7) {
      return "bg-green-100 text-green-800";
    } else if (daysSinceActive <= 30) {
      return "bg-blue-100 text-blue-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (user: User) => {
    if (!user.emailVerified) {
      return "Pending";
    }

    const daysSinceActive = Math.floor(
      (new Date().getTime() - new Date(user.lastActive).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (daysSinceActive <= 7) {
      return "Active";
    } else if (daysSinceActive <= 30) {
      return "Inactive";
    } else {
      return "Dormant";
    }
  };

  const userStats = [
    {
      label: "Total Users",
      value: stats.total.toLocaleString(),
      change: "+0%", // You can calculate this based on historical data
      color: "text-blue-600",
    },
    {
      label: "Active Members",
      value: stats.active.toLocaleString(),
      change: "+0%",
      color: "text-green-600",
    },
    {
      label: "Pending Users",
      value: stats.pending.toLocaleString(),
      change: "+0%",
      color: "text-yellow-600",
    },
    {
      label: "Administrators",
      value: (
        (stats.byRole.ADMIN || 0) + (stats.byRole.SUPER_ADMIN || 0)
      ).toString(),
      change: "+0%",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadUsers} disabled={loading}>
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className={`text-sm ${stat.color}`}>
                  {stat.change} from last month
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg z-[60]">
            <SelectItem
              value="all"
              className="hover:bg-gray-100 focus:bg-gray-100"
            >
              All Roles
            </SelectItem>
            <SelectItem
              value="SUPER_ADMIN"
              className="hover:bg-gray-100 focus:bg-gray-100"
            >
              Super Admin
            </SelectItem>
            <SelectItem
              value="ADMIN"
              className="hover:bg-gray-100 focus:bg-gray-100"
            >
              Admin
            </SelectItem>
            <SelectItem
              value="MINISTRY_LEADER"
              className="hover:bg-gray-100 focus:bg-gray-100"
            >
              Ministry Leader
            </SelectItem>
            <SelectItem
              value="MEMBER"
              className="hover:bg-gray-100 focus:bg-gray-100"
            >
              Member
            </SelectItem>
            <SelectItem
              value="VISITOR"
              className="hover:bg-gray-100 focus:bg-gray-100"
            >
              Visitor
            </SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg z-[60]">
            <SelectItem
              value="all"
              className="hover:bg-gray-100 focus:bg-gray-100"
            >
              All Status
            </SelectItem>
            <SelectItem
              value="active"
              className="hover:bg-gray-100 focus:bg-gray-100"
            >
              Active
            </SelectItem>
            <SelectItem
              value="inactive"
              className="hover:bg-gray-100 focus:bg-gray-100"
            >
              Inactive
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">User</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Joined</th>
                      <th className="text-left py-3 px-4">Last Active</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatarUrl || ""} />
                              <AvatarFallback>
                                {user.firstName[0]}
                                {user.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-gray-600">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {currentUser?.role === "SUPER_ADMIN" ? (
                            <Select
                              value={user.role}
                              onValueChange={(newRole) =>
                                handleUpdateUserRole(
                                  user.id,
                                  newRole as UserRole
                                )
                              }
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-gray-200 shadow-lg z-[60] min-w-[140px]">
                                <SelectItem
                                  value="VISITOR"
                                  className="hover:bg-gray-100 focus:bg-gray-100"
                                >
                                  Visitor
                                </SelectItem>
                                <SelectItem
                                  value="MEMBER"
                                  className="hover:bg-gray-100 focus:bg-gray-100"
                                >
                                  Member
                                </SelectItem>
                                <SelectItem
                                  value="MINISTRY_LEADER"
                                  className="hover:bg-gray-100 focus:bg-gray-100"
                                >
                                  Ministry Leader
                                </SelectItem>
                                <SelectItem
                                  value="ADMIN"
                                  className="hover:bg-gray-100 focus:bg-gray-100"
                                >
                                  Admin
                                </SelectItem>
                                <SelectItem
                                  value="SUPER_ADMIN"
                                  className="hover:bg-gray-100 focus:bg-gray-100"
                                >
                                  Super Admin
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge className={getRoleColor(user.role)}>
                              {user.role.replace("_", " ")}
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(user)}>
                            {getStatusText(user)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          {formatDate(user.joinedDate)}
                        </td>
                        <td className="py-3 px-4">
                          {formatTimeAgo(user.lastActive)}
                        </td>
                        <td className="py-3 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                              {currentUser?.role === "SUPER_ADMIN" &&
                                user.id !== currentUser.id && (
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                        className="text-red-600"
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete User
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Delete User
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to delete{" "}
                                          {user.firstName} {user.lastName}? This
                                          action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() =>
                                            handleDeleteUser(user.id)
                                          }
                                          className="bg-red-600 hover:bg-red-700"
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-600">
                    Showing {users.length} of {pagination.total} users
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      Page {pagination.page} of {pagination.pages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
