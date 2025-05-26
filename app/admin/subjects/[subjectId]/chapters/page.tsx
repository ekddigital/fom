// app/admin/subjects/[subjectId]/chapters/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react"; // Added useCallback
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { PlusCircle, Edit, Trash2, ArrowLeft } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  order: number;
  subject_id: string;
  // Add other fields if necessary, e.g., created_at, updated_at
}

interface Subject {
  id: string;
  name: string;
  // Add other fields if necessary
}

export default function AdminChaptersPage() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.subjectId as string;

  const [subject, setSubject] = useState<Subject | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSubject, setIsLoadingSubject] = useState(true);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newChapterOrder, setNewChapterOrder] = useState<number | string>(""); // Allow string for input flexibility

  const fetchSubjectDetails = useCallback(async () => {
    setIsLoadingSubject(true);
    try {
      const response = await fetch(`/api/subjects/${subjectId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch subject details");
      }
      const data = await response.json();
      setSubject(data);
    } catch (error) {
      console.error("Error fetching subject details:", error);
      toast.error(
        (error as Error).message || "Could not load subject details."
      );
      // Optionally redirect or show a more prominent error
    } finally {
      setIsLoadingSubject(false);
    }
  }, [subjectId]); // Added subjectId to dependency array

  const fetchChapters = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/subjects/${subjectId}/chapters`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch chapters");
      }
      const data = await response.json();
      setChapters(data);
    } catch (error) {
      console.error("Error fetching chapters:", error);
      toast.error((error as Error).message || "Could not load chapters.");
    } finally {
      setIsLoading(false);
    }
  }, [subjectId]); // Added subjectId to dependency array

  useEffect(() => {
    if (subjectId) {
      fetchSubjectDetails();
      fetchChapters();
    }
  }, [subjectId, fetchSubjectDetails, fetchChapters]); // Added fetchSubjectDetails and fetchChapters to dependency array

  const handleCreateChapter = async () => {
    if (
      !newChapterTitle.trim() ||
      newChapterOrder === "" ||
      isNaN(Number(newChapterOrder))
    ) {
      toast.error("Title and a valid order number are required.");
      return;
    }
    try {
      const response = await fetch(`/api/subjects/${subjectId}/chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newChapterTitle,
          order: Number(newChapterOrder),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create chapter");
      }
      await fetchChapters(); // Refresh list
      toast.success("Chapter created successfully!");
      setIsCreateDialogOpen(false);
      setNewChapterTitle("");
      setNewChapterOrder("");
    } catch (error) {
      console.error("Error creating chapter:", error);
      toast.error((error as Error).message || "Could not create chapter.");
    }
  };

  const handleEditChapter = async () => {
    if (
      !currentChapter ||
      !newChapterTitle.trim() ||
      newChapterOrder === "" ||
      isNaN(Number(newChapterOrder))
    ) {
      toast.error("Title and a valid order number are required.");
      return;
    }
    try {
      const response = await fetch(
        `/api/subjects/${subjectId}/chapters/${currentChapter.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newChapterTitle,
            order: Number(newChapterOrder),
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update chapter");
      }
      await fetchChapters(); // Refresh list
      toast.success("Chapter updated successfully!");
      setIsEditDialogOpen(false);
      setCurrentChapter(null);
      setNewChapterTitle("");
      setNewChapterOrder("");
    } catch (error) {
      console.error("Error updating chapter:", error);
      toast.error((error as Error).message || "Could not update chapter.");
    }
  };

  const handleDeleteChapter = async () => {
    if (!currentChapter) return;
    try {
      const response = await fetch(
        `/api/subjects/${subjectId}/chapters/${currentChapter.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete chapter");
      }
      await fetchChapters(); // Refresh list
      toast.success("Chapter deleted successfully!");
      setIsDeleteDialogOpen(false);
      setCurrentChapter(null);
    } catch (error) {
      console.error("Error deleting chapter:", error);
      toast.error((error as Error).message || "Could not delete chapter.");
    }
  };

  const openEditDialog = (chapter: Chapter) => {
    setCurrentChapter(chapter);
    setNewChapterTitle(chapter.title);
    setNewChapterOrder(chapter.order);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (chapter: Chapter) => {
    setCurrentChapter(chapter);
    setIsDeleteDialogOpen(true);
  };

  const openCreateDialog = () => {
    setNewChapterTitle("");
    setNewChapterOrder(""); // Reset for new chapter
    setIsCreateDialogOpen(true);
  };

  if (isLoadingSubject) {
    return (
      <div className="container mx-auto p-4">Loading subject details...</div>
    );
  }

  if (!subject) {
    return (
      <div className="container mx-auto p-4">
        <p>Subject not found or failed to load.</p>
        <Button
          onClick={() => router.push("/admin/subjects")}
          variant="outline"
          className="mt-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Subjects
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Button
            onClick={() => router.push("/admin/subjects")}
            variant="outline"
            size="sm"
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Subjects
          </Button>
          <h1 className="text-3xl font-bold">
            Manage Chapters for: {subject.name}
          </h1>
        </div>
        <Button onClick={openCreateDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Chapter
        </Button>
      </div>

      {/* Create Chapter Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Chapter</DialogTitle>
            <DialogDescription>
              Enter the details for the new chapter.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-title" className="text-right">
                Title
              </Label>
              <Input
                id="new-title"
                value={newChapterTitle}
                onChange={(e) => setNewChapterTitle(e.target.value)}
                className="col-span-3"
                placeholder="Chapter Title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-order" className="text-right">
                Order
              </Label>
              <Input
                id="new-order"
                type="number"
                value={newChapterOrder}
                onChange={(e) => setNewChapterOrder(e.target.value)}
                className="col-span-3"
                placeholder="Display Order (e.g., 1, 2)"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreateChapter}>Create Chapter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Chapter Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Chapter</DialogTitle>
            <DialogDescription>
              Update the details for &quot;{currentChapter?.title}&quot;.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Title
              </Label>
              <Input
                id="edit-title"
                value={newChapterTitle}
                onChange={(e) => setNewChapterTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-order" className="text-right">
                Order
              </Label>
              <Input
                id="edit-order"
                type="number"
                value={newChapterOrder}
                onChange={(e) => setNewChapterOrder(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentChapter(null);
                  setNewChapterTitle("");
                  setNewChapterOrder("");
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleEditChapter}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Chapter Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Chapter</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the chapter &quot;
              {currentChapter?.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setCurrentChapter(null)}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteChapter}>
              Delete Chapter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <p>Loading chapters...</p>
      ) : chapters.length === 0 ? (
        <p>No chapters found for this subject. Add one to get started!</p>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="w-[100px]">Order</TableHead>
                <TableHead className="w-[150px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chapters
                .sort((a, b) => a.order - b.order) // Ensure client-side sort matches API if not already sorted
                .map((chapter) => (
                  <TableRow key={chapter.id}>
                    <TableCell className="font-medium">
                      {chapter.title}
                    </TableCell>
                    <TableCell>{chapter.order}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(chapter)}
                        className="mr-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(chapter)}
                        className="text-red-500 hover:text-red-600"
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
