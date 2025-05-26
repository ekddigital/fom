// app/admin/subjects/[subjectId]/chapters/[chapterId]/topics/page.tsx
"use client";

import { useEffect, useState } from "react";
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
import { PlusCircle, Edit, Trash2, ArrowLeft, BookOpen } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  order: number;
  chapter_id: string;
}

interface Chapter {
  id: string;
  title: string;
  subject_id: string;
}

interface Subject {
  id: string;
  title: string; // Assuming subject has a name/title property
}

export default function AdminTopicsPage() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.subjectId as string;
  const chapterId = params.chapterId as string;

  const [subject, setSubject] = useState<Subject | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingChapter, setIsLoadingChapter] = useState(true);
  const [isLoadingSubject, setIsLoadingSubject] = useState(true);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicOrder, setNewTopicOrder] = useState<number | string>("");

  useEffect(() => {
    if (subjectId) {
      fetchSubjectDetails();
    }
    if (subjectId && chapterId) {
      fetchChapterDetails();
      fetchTopics();
    }
  }, [subjectId, chapterId]);

  const fetchSubjectDetails = async () => {
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
    } finally {
      setIsLoadingSubject(false);
    }
  };

  const fetchChapterDetails = async () => {
    setIsLoadingChapter(true);
    try {
      const response = await fetch(
        `/api/subjects/${subjectId}/chapters/${chapterId}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch chapter details");
      }
      const data = await response.json();
      setChapter(data);
    } catch (error) {
      console.error("Error fetching chapter details:", error);
      toast.error(
        (error as Error).message || "Could not load chapter details."
      );
    } finally {
      setIsLoadingChapter(false);
    }
  };

  const fetchTopics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/subjects/${subjectId}/chapters/${chapterId}/topics`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch topics");
      }
      const data = await response.json();
      setTopics(data);
    } catch (error) {
      console.error("Error fetching topics:", error);
      toast.error((error as Error).message || "Could not load topics.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTopic = async () => {
    if (
      !newTopicTitle.trim() ||
      newTopicOrder === "" ||
      isNaN(Number(newTopicOrder))
    ) {
      toast.error("Title and a valid order number are required.");
      return;
    }
    try {
      const response = await fetch(
        `/api/subjects/${subjectId}/chapters/${chapterId}/topics`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newTopicTitle,
            order: Number(newTopicOrder),
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create topic");
      }
      await fetchTopics();
      toast.success("Topic created successfully!");
      setIsCreateDialogOpen(false);
      setNewTopicTitle("");
      setNewTopicOrder("");
    } catch (error) {
      console.error("Error creating topic:", error);
      toast.error((error as Error).message || "Could not create topic.");
    }
  };

  const handleEditTopic = async () => {
    if (
      !currentTopic ||
      !newTopicTitle.trim() ||
      newTopicOrder === "" ||
      isNaN(Number(newTopicOrder))
    ) {
      toast.error("Title and a valid order number are required.");
      return;
    }
    try {
      const response = await fetch(
        `/api/subjects/${subjectId}/chapters/${chapterId}/topics/${currentTopic.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newTopicTitle,
            order: Number(newTopicOrder),
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update topic");
      }
      await fetchTopics();
      toast.success("Topic updated successfully!");
      setIsEditDialogOpen(false);
      setCurrentTopic(null);
      setNewTopicTitle("");
      setNewTopicOrder("");
    } catch (error) {
      console.error("Error updating topic:", error);
      toast.error((error as Error).message || "Could not update topic.");
    }
  };

  const handleDeleteTopic = async () => {
    if (!currentTopic) return;
    try {
      const response = await fetch(
        `/api/subjects/${subjectId}/chapters/${chapterId}/topics/${currentTopic.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete topic");
      }
      await fetchTopics();
      toast.success("Topic deleted successfully!");
      setIsDeleteDialogOpen(false);
      setCurrentTopic(null);
    } catch (error) {
      console.error("Error deleting topic:", error);
      toast.error((error as Error).message || "Could not delete topic.");
    }
  };

  const openEditDialog = (topic: Topic) => {
    setCurrentTopic(topic);
    setNewTopicTitle(topic.title);
    setNewTopicOrder(topic.order);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (topic: Topic) => {
    setCurrentTopic(topic);
    setIsDeleteDialogOpen(true);
  };

  const openCreateDialog = () => {
    setNewTopicTitle("");
    setNewTopicOrder("");
    setIsCreateDialogOpen(true);
  };

  if (isLoadingSubject || isLoadingChapter) {
    return <div className="container mx-auto p-4">Loading details...</div>;
  }

  if (!subject || !chapter) {
    return (
      <div className="container mx-auto p-4">
        <p>Subject or Chapter not found or failed to load.</p>
        <Button
          onClick={() => router.push(`/admin/subjects/${subjectId}/chapters`)}
          variant="outline"
          className="mt-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Chapters
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Button
            onClick={() => router.push(`/admin/subjects/${subjectId}/chapters`)}
            variant="outline"
            size="sm"
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Chapters for{" "}
            {subject.title}
          </Button>
          <h1 className="text-3xl font-bold">
            Manage Topics for: {chapter.title}
          </h1>
        </div>
        <Button onClick={openCreateDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Topic
        </Button>
      </div>

      {/* Create Topic Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Topic</DialogTitle>
            <DialogDescription>
              Enter the details for the new topic in chapter &quot;
              {chapter.title}&quot;.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-topic-title" className="text-right">
                Title
              </Label>
              <Input
                id="new-topic-title"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
                className="col-span-3"
                placeholder="Topic Title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-topic-order" className="text-right">
                Order
              </Label>
              <Input
                id="new-topic-order"
                type="number"
                value={newTopicOrder}
                onChange={(e) => setNewTopicOrder(e.target.value)}
                className="col-span-3"
                placeholder="Display Order (e.g., 1, 2)"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreateTopic}>Create Topic</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Topic Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Topic</DialogTitle>
            <DialogDescription>
              Update the details for &quot;{currentTopic?.title}&quot;.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-topic-title" className="text-right">
                Title
              </Label>
              <Input
                id="edit-topic-title"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-topic-order" className="text-right">
                Order
              </Label>
              <Input
                id="edit-topic-order"
                type="number"
                value={newTopicOrder}
                onChange={(e) => setNewTopicOrder(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentTopic(null);
                  setNewTopicTitle("");
                  setNewTopicOrder("");
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleEditTopic}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Topic Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Topic</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the topic &quot;
              {currentTopic?.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setCurrentTopic(null)}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteTopic}>
              Delete Topic
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <p>Loading topics...</p>
      ) : topics.length === 0 ? (
        <p>No topics found for this chapter. Add one to get started!</p>
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
              {topics
                .sort((a, b) => a.order - b.order)
                .map((topic) => (
                  <TableRow key={topic.id}>
                    <TableCell className="font-medium">{topic.title}</TableCell>
                    <TableCell>{topic.order}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(topic)}
                        className="mr-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(topic)}
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
