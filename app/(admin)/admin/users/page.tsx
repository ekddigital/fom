import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  Shield,
  UserCheck,
  UserX,
  Plus,
  Download,
  Upload,
} from "lucide-react";

export default function AdminUsersPage() {
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      role: "MEMBER",
      status: "active",
      joinDate: "2023-01-15",
      lastActive: "2 hours ago",
      avatar: "/api/placeholder/40/40",
      ministries: ["Youth", "Worship"],
      certifications: 3,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 234-5678",
      role: "MINISTRY_LEADER",
      status: "active",
      joinDate: "2022-08-22",
      lastActive: "1 day ago",
      avatar: "/api/placeholder/40/40",
      ministries: ["Women's Ministry", "Bible Study"],
      certifications: 5,
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "m.brown@email.com",
      phone: "+1 (555) 345-6789",
      role: "MEMBER",
      status: "pending",
      joinDate: "2024-01-10",
      lastActive: "Never",
      avatar: "/api/placeholder/40/40",
      ministries: [],
      certifications: 0,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 456-7890",
      role: "ADMIN",
      status: "active",
      joinDate: "2021-03-05",
      lastActive: "30 minutes ago",
      avatar: "/api/placeholder/40/40",
      ministries: ["Administration"],
      certifications: 8,
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.w@email.com",
      phone: "+1 (555) 567-8901",
      role: "MEMBER",
      status: "inactive",
      joinDate: "2023-06-18",
      lastActive: "2 weeks ago",
      avatar: "/api/placeholder/40/40",
      ministries: ["Men's Ministry"],
      certifications: 2,
    },
  ];

  const userStats = [
    {
      label: "Total Users",
      value: "1,247",
      change: "+12%",
      color: "text-blue-600",
    },
    {
      label: "Active Members",
      value: "1,089",
      change: "+8%",
      color: "text-green-600",
    },
    {
      label: "Ministry Leaders",
      value: "45",
      change: "+3",
      color: "text-purple-600",
    },
    {
      label: "Pending Approval",
      value: "23",
      change: "-5",
      color: "text-orange-600",
    },
  ];

  const roleColors = {
    VISITOR: "bg-gray-100 text-gray-800",
    MEMBER: "bg-blue-100 text-blue-800",
    MINISTRY_LEADER: "bg-purple-100 text-purple-800",
    ADMIN: "bg-red-100 text-red-800",
    SUPER_ADMIN: "bg-yellow-100 text-yellow-800",
  };

  const statusColors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    pending: "bg-orange-100 text-orange-800",
    suspended: "bg-red-100 text-red-800",
  };

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
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add User
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

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users by name, email, or phone..."
                className="pl-10"
              />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md">
              <option value="">All Roles</option>
              <option value="VISITOR">Visitor</option>
              <option value="MEMBER">Member</option>
              <option value="MINISTRY_LEADER">Ministry Leader</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list">
            <TabsList className="mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{user.name}</h3>
                          <Badge
                            className={
                              roleColors[user.role as keyof typeof roleColors]
                            }
                          >
                            {user.role.replace("_", " ")}
                          </Badge>
                          <Badge
                            className={
                              statusColors[
                                user.status as keyof typeof statusColors
                              ]
                            }
                          >
                            {user.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>
                            Joined:{" "}
                            {new Date(user.joinDate).toLocaleDateString()}
                          </span>
                          <span>Last active: {user.lastActive}</span>
                          <span>Certifications: {user.certifications}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {user.ministries.length > 0 && (
                        <div className="flex gap-1">
                          {user.ministries
                            .slice(0, 2)
                            .map((ministry, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {ministry}
                              </Badge>
                            ))}
                          {user.ministries.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{user.ministries.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <Card
                    key={user.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>

                        <div className="flex gap-2">
                          <Badge
                            className={
                              roleColors[user.role as keyof typeof roleColors]
                            }
                          >
                            {user.role.replace("_", " ")}
                          </Badge>
                          <Badge
                            className={
                              statusColors[
                                user.status as keyof typeof statusColors
                              ]
                            }
                          >
                            {user.status}
                          </Badge>
                        </div>

                        <div className="text-xs text-gray-500 space-y-1">
                          <p>
                            Joined:{" "}
                            {new Date(user.joinDate).toLocaleDateString()}
                          </p>
                          <p>Last active: {user.lastActive}</p>
                          <p>Certifications: {user.certifications}</p>
                        </div>

                        {user.ministries.length > 0 && (
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-gray-700">
                              Ministries:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {user.ministries.map((ministry, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {ministry}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Mail className="h-3 w-3 mr-1" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <UserCheck className="h-4 w-4 mr-2" />
              Approve Selected
            </Button>
            <Button variant="outline" size="sm">
              <UserX className="h-4 w-4 mr-2" />
              Suspend Selected
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Change Role
            </Button>
            <Button variant="outline" size="sm" className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Select users from the list above to perform bulk actions
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
