// app/admin/subjects/page.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner"; // Changed from useToast to sonner

// Updated Subject interface to match potential Prisma model (add more fields as needed)
interface Subject {
  id: string;
  title: string;
  description?: string | null;
  created_at?: string; // Or Date
  updated_at?: string; // Or Date
}

// API interaction functions
async function fetchSubjectsApi(): Promise<Subject[]> {
  const response = await fetch("/api/subjects");
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to fetch subjects" }));
    throw new Error(errorData.message || "Failed to fetch subjects");
  }
  return response.json();
}

async function createSubjectApi(data: {
  title: string;
  description?: string;
}): Promise<Subject> {
  const response = await fetch("/api/subjects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to create subject" }));
    throw new Error(errorData.message || "Failed to create subject");
  }
  return response.json();
}

async function updateSubjectApi(
  id: string,
  data: { title?: string; description?: string }
): Promise<Subject> {
  const response = await fetch(`/api/subjects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to update subject" }));
    throw new Error(errorData.message || "Failed to update subject");
  }
  return response.json();
}

async function deleteSubjectApi(id: string): Promise<void> {
  const response = await fetch(`/api/subjects/${id}`, {
    method: "DELETE",
  });
  if (!response.ok && response.status !== 204) {
    // 204 No Content is a success for DELETE
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to delete subject" }));
    throw new Error(errorData.message || "Failed to delete subject");
  }
  // For 204, response.json() will fail, so we don't try to parse it.
}

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for Create Dialog
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSubjectTitle, setNewSubjectTitle] = useState("");
  const [newSubjectDescription, setNewSubjectDescription] = useState("");

  // State for Edit Dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editSubjectTitle, setEditSubjectTitle] = useState("");
  const [editSubjectDescription, setEditSubjectDescription] = useState("");

  // State for Delete Dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingSubject, setDeletingSubject] = useState<Subject | null>(null);

  // Fetch initial subjects
  useEffect(() => {
    fetchSubjectsApi()
      .then(setSubjects)
      .catch((err) => {
        setError(err.message);
        toast.error(`Error fetching subjects: ${err.message}`); // Replaced alert with toast
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreateSubject = async (e: FormEvent) => {
    e.preventDefault();
    if (!newSubjectTitle.trim()) {
      toast.error("Title is required."); // Replaced alert with toast
      return;
    }
    try {
      const newSubject = await createSubjectApi({
        title: newSubjectTitle,
        description: newSubjectDescription,
      });
      setSubjects((prev) => [...prev, newSubject]);
      setIsCreateDialogOpen(false);
      setNewSubjectTitle("");
      setNewSubjectDescription("");
      toast.success("Subject created successfully."); // Replaced alert with toast
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Failed to create subject: ${err.message}`); // Replaced alert with toast
      } else {
        toast.error("An unknown error occurred while creating the subject."); // Replaced alert with toast
      }
    }
  };

  const openEditDialog = (subject: Subject) => {
    setEditingSubject(subject);
    setEditSubjectTitle(subject.title);
    setEditSubjectDescription(subject.description || "");
    setIsEditDialogOpen(true);
  };

  const handleEditSubject = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingSubject || !editSubjectTitle.trim()) {
      toast.error("Title is required for editing."); // Replaced alert with toast
      return;
    }
    try {
      const updatedSubject = await updateSubjectApi(editingSubject.id, {
        title: editSubjectTitle,
        description: editSubjectDescription,
      });
      setSubjects((prev) =>
        prev.map((s) => (s.id === updatedSubject.id ? updatedSubject : s))
      );
      setIsEditDialogOpen(false);
      setEditingSubject(null);
      toast.success("Subject updated successfully."); // Replaced alert with toast
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Failed to update subject: ${err.message}`); // Replaced alert with toast
      } else {
        toast.error("An unknown error occurred while updating the subject."); // Replaced alert with toast
      }
    }
  };

  const openDeleteDialog = (subject: Subject) => {
    setDeletingSubject(subject);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSubject = async () => {
    if (!deletingSubject) return;
    try {
      await deleteSubjectApi(deletingSubject.id);
      setSubjects((prev) => prev.filter((s) => s.id !== deletingSubject.id));
      setIsDeleteDialogOpen(false);
      setDeletingSubject(null);
      toast.success("Subject deleted successfully."); // Replaced alert with toast
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Failed to delete subject: ${err.message}`); // Replaced alert with toast
      } else {
        toast.error("An unknown error occurred while deleting the subject."); // Replaced alert with toast
      }
    }
  };

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-8">Loading subjects...</div>
    );
  // Do not render error message directly if using toasts for errors
  // if (error && !toast) return <div className="container mx-auto px-4 py-8">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Subjects</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Subject
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleCreateSubject}>
              {" "}
              {/* Use form element */}
              <DialogHeader>
                <DialogTitle>Create New Subject</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new subject.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="new-title" className="text-right">
                    {" "}
                    {/* Changed htmlFor */}
                    Title
                  </label>
                  <Input
                    id="new-title" // Changed id
                    value={newSubjectTitle}
                    onChange={(e) => setNewSubjectTitle(e.target.value)}
                    className="col-span-3"
                    placeholder="e.g., Advanced Algebra"
                    required // Added required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="new-description" className="text-right">
                    {" "}
                    {/* Changed htmlFor */}
                    Description
                  </label>
                  <Textarea
                    id="new-description" // Changed id
                    value={newSubjectDescription}
                    onChange={(e) => setNewSubjectDescription(e.target.value)}
                    className="col-span-3"
                    placeholder="Optional: A brief overview of the subject."
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error &&
        !isLoading && ( // Display general error if not loading and error exists
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <span className="font-medium">Error:</span> {error}
          </div>
        )}

      {subjects.length === 0 && !isLoading && !error ? ( // Adjusted condition
        <p>No subjects found. Start by creating one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col justify-between" // Added flex for button alignment
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{subject.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {subject.description || "No description provided."}
                </p>
              </div>
              <div className="flex gap-2 mt-auto">
                {" "}
                {/* Buttons at the bottom */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(subject)}
                >
                  <Edit className="mr-1 h-4 w-4" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => openDeleteDialog(subject)}
                >
                  <Trash2 className="mr-1 h-4 w-4" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Subject Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {editingSubject && (
            <form onSubmit={handleEditSubject}>
              {" "}
              {/* Use form element */}
              <DialogHeader>
                <DialogTitle>Edit Subject</DialogTitle>
                <DialogDescription>
                  Update the details for {editingSubject.title}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="edit-title" className="text-right">
                    Title
                  </label>
                  <Input
                    id="edit-title"
                    value={editSubjectTitle}
                    onChange={(e) => setEditSubjectTitle(e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="edit-description" className="text-right">
                    Description
                  </label>
                  <Textarea
                    id="edit-description"
                    value={editSubjectDescription}
                    onChange={(e) => setEditSubjectDescription(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Subject Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {deletingSubject && (
            <>
              <DialogHeader>
                <DialogTitle>Delete Subject</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the subject &quot;
                  {/* Escaped quote */}
                  {deletingSubject.title}&quot;? This action cannot be undone.{" "}
                  {/* Escaped quote */}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDeleteSubject}
                >
                  Delete
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
