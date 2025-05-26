// app/teacher/assignments/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner"; // Assuming you use sonner for toasts

// Interface for an assignment based on Prisma schema
interface Assignment {
  id: string;
  title: string;
  description: string | null;
  dueDate: string; // Keep as string for simplicity, format as needed
  status: "DRAFT" | "PUBLISHED" | "GRADING" | "COMPLETED"; // Matches Prisma Enum
  subjectId: string;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
  subject?: {
    // Include subject details
    id: string;
    name: string;
  };
  // assignedTo could be a separate model or a field if simple
  // For now, we'll derive it or simplify
}

export default function ManageAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/teacher/assignments");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch assignments");
        }
        const data = await response.json();
        setAssignments(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(message);
        toast.error("Error fetching assignments: " + message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleCreateNew = () => {
    // Later, this could open a modal or navigate to a new page.
    // For now, we can start by navigating to a new page e.g., /teacher/assignments/new
    console.log("Create new assignment clicked");
    // router.push('/teacher/assignments/new'); // If using Next.js router
    toast.info(
      "Navigation to create new assignment page will be implemented soon."
    );
  };

  const handleEdit = (assignmentId: string) => {
    console.log("Edit assignment:", assignmentId);
    // router.push(`/teacher/assignments/edit/${assignmentId}`);
    toast.info(
      `Edit functionality for assignment ${assignmentId} will be implemented soon.`
    );
  };

  const handleDelete = async (assignmentId: string) => {
    console.log("Delete assignment:", assignmentId);
    toast.info(
      `Delete functionality for assignment ${assignmentId} will be implemented soon.`
    );
    // Add confirmation and API call here
    // Example:
    // if (confirm("Are you sure you want to delete this assignment?")) {
    //   try {
    //     const response = await fetch(`/api/teacher/assignments/${assignmentId}`, { method: 'DELETE' });
    //     if (!response.ok) throw new Error('Failed to delete assignment');
    //     setAssignments(prev => prev.filter(a => a.id !== assignmentId));
    //     toast.success("Assignment deleted successfully");
    //   } catch (err: any) {
    //     toast.error("Error deleting assignment: " + err.message);
    //   }
    // }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Manage Assignments
        </h1>
        <div className="flex items-center space-x-2">
          <Button onClick={handleCreateNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Assignment
          </Button>
          <Link href="/teacher" passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {isLoading && (
        <p className="text-center text-gray-600 dark:text-gray-400 py-4">
          Loading assignments...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 dark:text-red-400 py-4">
          Error: {error}
        </p>
      )}
      {!isLoading && !error && assignments.length === 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            No Assignments Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You haven&apos;t created any assignments. Get started by creating
            one!
          </p>
          <Button onClick={handleCreateNew} size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Your First Assignment
          </Button>
        </div>
      )}
      {!isLoading && !error && assignments.length > 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <Table>
            <TableCaption>A list of your assignments.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                {/* <TableHead>Assigned To</TableHead> // Add if needed */}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">
                    {assignment.title}
                  </TableCell>
                  <TableCell>{assignment.subject?.name || "N/A"}</TableCell>
                  <TableCell>
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        assignment.status === "PUBLISHED"
                          ? "default"
                          : assignment.status === "DRAFT"
                          ? "outline"
                          : assignment.status === "COMPLETED"
                          ? "secondary"
                          : "destructive" // For GRADING or other states
                      }
                      className="capitalize" // To make DRAFT -> Draft
                    >
                      {assignment.status.toLowerCase()}
                    </Badge>
                  </TableCell>
                  {/* <TableCell>{assignment.assignedTo}</TableCell> */}
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(assignment.id)}
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(assignment.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
