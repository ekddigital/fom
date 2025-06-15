/**
 * JICF Cards Management Page
 * Beautiful, intuitive interface for creating and managing graduation cards
 */

"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Badge } from "../../../../components/ui/badge";
import { Separator } from "../../../../components/ui/separator";
import { useToast } from "../../../../lib/hooks/use-toast";
import { Download, Plus, Search, Heart, Star, Gift } from "lucide-react";

interface CardTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  previewUrl?: string;
}

interface UserCard {
  id: string;
  templateId: string;
  templateName: string;
  recipientName?: string;
  customMessage?: string;
  createdAt: string;
  downloadCount: number;
  viewCount: number;
}

export default function CardsPage() {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<CardTemplate[]>([]);
  const [userCards, setUserCards] = useState<UserCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // Create card form state
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [recipientName, setRecipientName] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch templates and user cards in parallel
      const [templatesRes, cardsRes] = await Promise.all([
        fetch("/api/cards/templates"),
        fetch("/api/cards"),
      ]);

      if (templatesRes.ok) {
        const templatesData = await templatesRes.json();
        setTemplates(templatesData.templates || []);
      }

      if (cardsRes.ok) {
        const cardsData = await cardsRes.json();
        setUserCards(cardsData.cards || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load cards data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateCard = async () => {
    if (!selectedTemplate) {
      toast({
        title: "Error",
        description: "Please select a template",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);

      const response = await fetch("/api/cards/issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: selectedTemplate,
          recipientName: recipientName.trim() || undefined,
          customMessage: customMessage.trim() || undefined,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Card created successfully",
        });

        // Reset form
        setSelectedTemplate("");
        setRecipientName("");
        setCustomMessage("");
        setShowCreateForm(false);

        // Refresh data
        await fetchData();
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to create card",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating card:", error);
      setIsCreating(false);
    }
  };

  const handleDownload = async (cardId: string, format: "png" | "pdf") => {
    try {
      const response = await fetch(
        `/api/cards/${cardId}/download?format=${format}`
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `card_${cardId}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast({
          title: "Success!",
          description: `Card downloaded as ${format.toUpperCase()}`,
        });
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Download failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: "Download failed",
        variant: "destructive",
      });
    }
  };

  // Filter templates based on search and category
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" ||
      template.category.toLowerCase() === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Heart className="mx-auto h-8 w-8 animate-pulse text-pink-400 mb-4" />
            <p className="text-muted-foreground">Loading beautiful cards...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Heart className="h-8 w-8 text-pink-500" />
            JICF Cards
          </h1>
          <p className="text-muted-foreground mt-1">
            Create beautiful graduation and appreciation cards
          </p>
        </div>

        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-pink-500 hover:bg-pink-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Card
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="graduation">Graduation</SelectItem>
                <SelectItem value="appreciation">Appreciation</SelectItem>
                <SelectItem value="blessing">Blessing</SelectItem>
                <SelectItem value="congratulation">Congratulation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Create Card Form */}
      {showCreateForm && (
        <Card className="border-pink-200 bg-pink-50/50">
          <CardHeader>
            <CardTitle className="text-pink-700">Create New Card</CardTitle>
            <CardDescription>
              Choose a template and personalize your card
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="template-select">Card Template</Label>
              <Select
                value={selectedTemplate}
                onValueChange={setSelectedTemplate}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex items-center gap-2">
                        {template.category === "graduation" && (
                          <Star className="h-4 w-4 text-yellow-500" />
                        )}
                        {template.category === "appreciation" && (
                          <Heart className="h-4 w-4 text-pink-500" />
                        )}
                        {template.category === "blessing" && (
                          <Gift className="h-4 w-4 text-blue-500" />
                        )}
                        {template.category === "congratulation" && (
                          <Star className="h-4 w-4 text-green-500" />
                        )}
                        {template.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="recipient-name">Recipient Name (Optional)</Label>
              <Input
                id="recipient-name"
                placeholder="Enter recipient's name"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="custom-message">Custom Message (Optional)</Label>
              <Textarea
                id="custom-message"
                placeholder="Enter a personal message"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateCard}
                disabled={isCreating}
                className="bg-pink-500 hover:bg-pink-600 text-white"
              >
                {isCreating ? "Creating..." : "Create Card"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Templates Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Available Templates ({filteredTemplates.length})
        </h2>

        {filteredTemplates.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No templates found matching your search.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="secondary" className="capitalize">
                      {template.category}
                    </Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Placeholder for template preview */}
                  <div className="aspect-[3/2] bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <Heart className="mx-auto h-8 w-8 text-pink-400 mb-2" />
                      <p className="text-sm text-muted-foreground">Preview</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      setShowCreateForm(true);
                    }}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* User's Created Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Gift className="h-5 w-5 text-blue-500" />
          Your Cards ({userCards.length})
        </h2>

        {userCards.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Gift className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                You haven't created any cards yet.
              </p>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Card
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCards.map((card) => (
              <Card key={card.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {card.templateName}
                    </CardTitle>
                    <Badge variant="outline">
                      {new Date(card.createdAt).toLocaleDateString()}
                    </Badge>
                  </div>
                  {card.recipientName && (
                    <CardDescription>For: {card.recipientName}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {card.customMessage && (
                    <div className="mb-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm italic">"{card.customMessage}"</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <span>Downloads: {card.downloadCount}</span>
                    <span>Views: {card.viewCount}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownload(card.id, "png")}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      PNG
                    </Button>
                    <Button
                      onClick={() => handleDownload(card.id, "pdf")}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
