/**
 * JICF Cards Management Page
 * Beautiful, intuitive interface for creating and managing graduation cards with bulk operations
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import {
  Download,
  Plus,
  Search,
  Heart,
  Star,
  Gift,
  Eye,
  Mail,
  Sparkles,
  Archive,
  Trash2,
  Grid3X3,
  List,
} from "lucide-react";
import { CardPreviewModal } from "../../../../components/ui/features/card-preview-modal";

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

  // Core state
  const [templates, setTemplates] = useState<CardTemplate[]>([]);
  const [userCards, setUserCards] = useState<UserCard[]>([]);
  const [loading, setLoading] = useState(true);

  // Single card creation state
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [recipientName, setRecipientName] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false); // Service outline specific fields
  const [serviceOutline, setServiceOutline] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [mcName, setMcName] = useState("");

  // Graduates name list specific column mappings
  const [selectedCountryColumn, setSelectedCountryColumn] = useState("");
  const [selectedUniversityColumn, setSelectedUniversityColumn] = useState("");
  const [selectedMajorColumn, setSelectedMajorColumn] = useState("");
  // Bulk upload state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileColumns, setFileColumns] = useState<string[]>([]);
  const [fileData, setFileData] = useState<string[][]>([]);
  const [selectedNameColumn, setSelectedNameColumn] = useState("");
  // Service Outline specific column mappings
  const [selectedTimeColumn, setSelectedTimeColumn] = useState("");
  const [selectedEndTimeColumn, setSelectedEndTimeColumn] = useState("");
  const [selectedItemColumn, setSelectedItemColumn] = useState("");
  const [selectedCoordinatorColumn, setSelectedCoordinatorColumn] =
    useState("");

  const [bulkCustomMessage, setBulkCustomMessage] = useState("");
  const [bulkEventName, setBulkEventName] = useState("");
  const [bulkEventDate, setBulkEventDate] = useState("");
  const [bulkMcName, setBulkMcName] = useState("");
  const [isBulkCreating, setIsBulkCreating] = useState(false);

  // Bulk operations state
  const [selectedCardIds, setSelectedCardIds] = useState<Set<string>>(
    new Set()
  ); // Search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [templatesViewMode, setTemplatesViewMode] = useState<"grid" | "list">(
    "grid"
  );

  // Preview modal state
  const [previewCard, setPreviewCard] = useState<UserCard | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Computed filtered data
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" ||
      template.category.toLowerCase() === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredCards = userCards.filter((card) => {
    const matchesSearch =
      searchQuery === "" ||
      card.recipientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.customMessage?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || card.templateId.includes(filterCategory);

    return matchesSearch && matchesCategory;
  });

  const fetchData = useCallback(async () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch data on component mount
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Single card creation
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
          serviceOutline: serviceOutline.trim() || undefined,
          eventName: eventName.trim() || undefined,
          eventDate: eventDate.trim() || undefined,
          mcName: mcName.trim() || undefined,
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
        setServiceOutline("");
        setEventName("");
        setEventDate("");
        setMcName("");
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
      toast({
        title: "Error",
        description: "Failed to create card",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };
  // File upload for bulk creation
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);

    // Parse the file to extract columns
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result as string;
        let parsedData: string[][];

        if (file.name.endsWith(".csv")) {
          // Simple CSV parsing
          const lines = data.split("\n").filter((line) => line.trim());
          parsedData = lines.map((line) => {
            // Handle quoted CSV values
            const result: string[] = [];
            let current = "";
            let inQuotes = false;

            for (let i = 0; i < line.length; i++) {
              const char = line[i];
              if (char === '"') {
                inQuotes = !inQuotes;
              } else if (char === "," && !inQuotes) {
                result.push(current.trim());
                current = "";
              } else {
                current += char;
              }
            }
            result.push(current.trim());
            return result.map((cell) => cell.replace(/^"|"$/g, ""));
          });
        } else {
          toast({
            title: "Error",
            description:
              "Excel files not fully supported yet. Please use CSV format.",
            variant: "destructive",
          });
          return;
        }

        if (parsedData.length > 0) {
          const headers = parsedData[0].map(
            (header, index) => header || `Column ${index + 1}`
          );
          setFileColumns(headers);
          setFileData(parsedData.slice(1)); // Rest as data          // Set default columns based on template type
          if (selectedTemplate === "service-outline") {
            // Auto-detect common service outline columns
            const timeCol =
              headers.find((h) => h?.toLowerCase().includes("time")) ||
              headers[1];
            const endTimeCol =
              headers.length > 2 && !headers[2]?.toLowerCase().includes("item")
                ? headers[2]
                : "";
            const itemCol =
              headers.find((h) => h?.toLowerCase().includes("item")) ||
              headers[3];
            const coordinatorCol =
              headers.find((h) => h?.toLowerCase().includes("coordinator")) ||
              headers[4];

            setSelectedTimeColumn(timeCol || `col_1`);
            setSelectedEndTimeColumn(
              endTimeCol ? endTimeCol || `col_2` : "none"
            );
            setSelectedItemColumn(itemCol || `col_3`);
            setSelectedCoordinatorColumn(coordinatorCol || `col_4`);
          } else if (selectedTemplate === "graduates-name-list") {
            // Auto-detect common graduates columns
            const nameCol =
              headers.find((h) => h?.toLowerCase().includes("name")) ||
              headers[0];
            const countryCol =
              headers.find((h) => h?.toLowerCase().includes("country")) ||
              headers[1];
            const universityCol =
              headers.find(
                (h) =>
                  h?.toLowerCase().includes("university") ||
                  h?.toLowerCase().includes("school")
              ) || headers[2];
            const majorCol =
              headers.find(
                (h) =>
                  h?.toLowerCase().includes("major") ||
                  h?.toLowerCase().includes("academic")
              ) || headers[3];
            setSelectedNameColumn(nameCol || `col_0`);
            setSelectedCountryColumn(countryCol || `col_1`);
            setSelectedUniversityColumn(universityCol || `col_2`);
            setSelectedMajorColumn(majorCol || `col_3`);
          } else if (selectedTemplate === "meet-our-graduates") {
            // Auto-detect common graduates columns (same as graduates-name-list)
            const nameCol =
              headers.find((h) => h?.toLowerCase().includes("name")) ||
              headers[0];
            const countryCol =
              headers.find((h) => h?.toLowerCase().includes("country")) ||
              headers[1];
            const universityCol =
              headers.find(
                (h) =>
                  h?.toLowerCase().includes("university") ||
                  h?.toLowerCase().includes("school")
              ) || headers[2];
            const majorCol =
              headers.find(
                (h) =>
                  h?.toLowerCase().includes("major") ||
                  h?.toLowerCase().includes("academic")
              ) || headers[3];

            setSelectedNameColumn(nameCol || `col_0`);
            setSelectedCountryColumn(countryCol || `col_1`);
            setSelectedUniversityColumn(universityCol || `col_2`);
            setSelectedMajorColumn(majorCol || `col_3`);
          } else {
            // For other templates, default to first column for names
            setSelectedNameColumn(headers[0] || `col_0`);
          }

          toast({
            title: "Success",
            description: `Parsed ${parsedData.length - 1} rows with ${
              headers.length
            } columns`,
          });
        } else {
          toast({
            title: "Error",
            description: "No data found in file",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error parsing file:", error);
        toast({
          title: "Error",
          description: "Error parsing file. Please check the format.",
          variant: "destructive",
        });
      }
    };

    reader.readAsText(file);
  };
  const handleBulkCreateCards = async () => {
    if (!selectedTemplate || !fileData.length) {
      toast({
        title: "Error",
        description: "Please select a template and upload a file",
        variant: "destructive",
      });
      return;
    } // Validate required columns based on template type
    if (selectedTemplate === "service-outline") {
      if (
        !selectedTimeColumn ||
        !selectedItemColumn ||
        !selectedCoordinatorColumn
      ) {
        toast({
          title: "Error",
          description:
            "Please select Time, Item, and Coordinator columns for service outline",
          variant: "destructive",
        });
        return;
      }
    } else if (selectedTemplate === "graduates-name-list") {
      if (
        !selectedNameColumn ||
        !selectedCountryColumn ||
        !selectedUniversityColumn ||
        !selectedMajorColumn
      ) {
        toast({
          title: "Error",
          description:
            "Please select Name, Country, University, and Major columns for graduates name list",
          variant: "destructive",
        });
        return;
      }
    } else if (selectedTemplate === "meet-our-graduates") {
      if (
        !selectedNameColumn ||
        !selectedCountryColumn ||
        !selectedUniversityColumn ||
        !selectedMajorColumn
      ) {
        toast({
          title: "Error",
          description:
            "Please select Name, Country, University, and Major columns for Meet Our Graduates",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (!selectedNameColumn) {
        toast({
          title: "Error",
          description: "Please select a name column",
          variant: "destructive",
        });
        return;
      }
    }
    setIsBulkCreating(true);

    try {
      if (selectedTemplate === "service-outline") {
        // Create a single service outline card
        const timeColumnIndex = fileColumns.findIndex(
          (col, idx) => (col || `col_${idx}`) === selectedTimeColumn
        );
        const endTimeColumnIndex =
          selectedEndTimeColumn && selectedEndTimeColumn !== "none"
            ? fileColumns.findIndex(
                (col, idx) => (col || `col_${idx}`) === selectedEndTimeColumn
              )
            : -1;
        const itemColumnIndex = fileColumns.findIndex(
          (col, idx) => (col || `col_${idx}`) === selectedItemColumn
        );
        const coordinatorColumnIndex = fileColumns.findIndex(
          (col, idx) => (col || `col_${idx}`) === selectedCoordinatorColumn
        );
        // Build service outline from CSV data
        const serviceItems = fileData
          .map((row) => {
            const startTime = row[timeColumnIndex] || "";
            const endTime =
              endTimeColumnIndex !== -1 ? row[endTimeColumnIndex] : "";
            const item = row[itemColumnIndex] || "";
            const coordinator = row[coordinatorColumnIndex] || "";

            // Format time display
            let timeDisplay = startTime;
            if (endTime && endTime !== startTime) {
              timeDisplay = `${startTime} - ${endTime}`;
            }

            return `${timeDisplay} • ${item} (${coordinator})`.trim();
          })
          .filter((item) => item.length > 3); // Filter out empty or very short items

        const cardData = {
          templateId: selectedTemplate,
          eventName: bulkEventName || "JICF Graduation Service",
          eventDate: bulkEventDate || new Date().toLocaleDateString(),
          mcName: bulkMcName || "",
          serviceOutline: serviceItems.join("\n"),
          customMessage: bulkCustomMessage.trim() || undefined,
        };

        console.log("🔍 Service Outline Card Data:", cardData);
        console.log("🔍 Service Items:", serviceItems);

        const response = await fetch("/api/cards/issue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cardData),
        });
        if (response.ok) {
          toast({
            title: "Success!",
            description: "Service outline card created successfully",
          });
        } else {
          throw new Error("Failed to create service outline card");
        }
      } else if (selectedTemplate === "graduates-name-list") {
        // Create a single graduates name list card
        const nameColumnIndex = fileColumns.findIndex(
          (col, idx) => (col || `col_${idx}`) === selectedNameColumn
        );
        const countryColumnIndex = fileColumns.findIndex(
          (col, idx) => (col || `col_${idx}`) === selectedCountryColumn
        );
        const universityColumnIndex = fileColumns.findIndex(
          (col, idx) => (col || `col_${idx}`) === selectedUniversityColumn
        );
        const majorColumnIndex = fileColumns.findIndex(
          (col, idx) => (col || `col_${idx}`) === selectedMajorColumn
        );

        // Build graduates list from CSV data
        const graduatesList = fileData
          .map((row) => {
            const name = row[nameColumnIndex] || "";
            const country = row[countryColumnIndex] || "";
            const university = row[universityColumnIndex] || "";
            const major = row[majorColumnIndex] || "";

            if (!name.trim()) return null;

            return {
              name: name.trim(),
              country: country.trim(),
              university: university.trim(),
              major: major.trim(),
            };
          })
          .filter((graduate) => graduate !== null);

        // Format the graduates list for display
        const graduatesText = graduatesList
          .map(
            (grad, index) =>
              `${index + 1}. ${grad.name} • ${grad.country} • ${
                grad.university
              } • ${grad.major}`
          )
          .join("\n");

        const cardData = {
          templateId: selectedTemplate,
          eventName: bulkEventName || "JICF Graduation Ceremony",
          eventDate: bulkEventDate || new Date().toLocaleDateString(),
          graduatesList: graduatesText,
          customMessage: bulkCustomMessage.trim() || undefined,
        };

        console.log("🔍 Graduates Name List Card Data:", cardData);
        console.log("🔍 Graduates List:", graduatesList);

        const response = await fetch("/api/cards/issue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cardData),
        });
        if (response.ok) {
          toast({
            title: "Success!",
            description: "Graduates name list card created successfully",
          });
        } else {
          throw new Error("Failed to create graduates name list card");
        }
      } else if (selectedTemplate === "meet-our-graduates") {
        // Create a single "Meet Our Graduates" multi-page card
        const nameColumnIndex = fileColumns.findIndex(
          (col, idx) => (col || `col_${idx}`) === selectedNameColumn
        );
        const countryColumnIndex = fileColumns.findIndex(
          (col, idx) => (col || `col_${idx}`) === selectedCountryColumn
        );
        const universityColumnIndex = fileColumns.findIndex(
          (col, idx) => (col || `col_${idx}`) === selectedUniversityColumn
        );
        const majorColumnIndex = fileColumns.findIndex(
          (col, idx) => (col || `col_${idx}`) === selectedMajorColumn
        );

        // Additional columns for Meet Our Graduates
        const emailColumnIndex = fileColumns.findIndex(
          (col, idx) =>
            col?.toLowerCase().includes("email") || `col_${idx}` === `col_6`
        );
        const phoneColumnIndex = fileColumns.findIndex(
          (col, idx) =>
            col?.toLowerCase().includes("phone") || `col_${idx}` === `col_7`
        );
        const positionColumnIndex = fileColumns.findIndex(
          (col, idx) =>
            col?.toLowerCase().includes("position") || `col_${idx}` === `col_10`
        );
        const messageColumnIndex = fileColumns.findIndex(
          (col, idx) =>
            col?.toLowerCase().includes("message") || `col_${idx}` === `col_13`
        );
        const numPicturesColumnIndex = fileColumns.findIndex(
          (col, idx) =>
            col?.toLowerCase().includes("picture") || `col_${idx}` === `col_14`
        );

        // Build detailed graduates data from CSV
        const detailedGraduatesData = fileData
          .map((row, index) => {
            const name = row[nameColumnIndex] || "";
            const country = row[countryColumnIndex] || "";
            const university = row[universityColumnIndex] || "";
            const major = row[majorColumnIndex] || "";
            const email = row[emailColumnIndex] || "";
            const phone = row[phoneColumnIndex] || "";
            const position = row[positionColumnIndex] || "";
            const message = row[messageColumnIndex] || "";
            const numPictures = row[numPicturesColumnIndex] || "0";

            if (!name.trim()) return null;

            return {
              "No.": (index + 1).toString(),
              Name: name.trim(),
              Country: country.trim(),
              University: university.trim(),
              "Academic Major": major.trim(),
              Email: email.trim(),
              Phone: phone.trim(),
              "Position(s) Held at JICF": position.trim(),
              "Message from the graduates": message.trim(),
              "Number of Pictures": numPictures.toString(),
            };
          })
          .filter((graduate) => graduate !== null);

        const cardData = {
          templateId: selectedTemplate,
          eventName: bulkEventName || "JICF Graduation Ceremony",
          eventDate: bulkEventDate || new Date().toLocaleDateString(),
          meetOurGraduatesData: JSON.stringify(detailedGraduatesData),
          customMessage: bulkCustomMessage.trim() || undefined,
        };

        console.log("🔍 Meet Our Graduates Card Data:", cardData);
        console.log("🔍 Detailed Graduates Data:", detailedGraduatesData);

        const response = await fetch("/api/cards/issue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cardData),
        });

        if (response.ok) {
          toast({
            title: "Success!",
            description:
              "Meet Our Graduates multi-page card created successfully",
          });
        } else {
          throw new Error("Failed to create Meet Our Graduates card");
        }
      } else {
        // Create multiple cards for other templates (name-based)
        const nameColumnIndex = fileColumns.findIndex(
          (col, idx) => (col || `col_${idx}`) === selectedNameColumn
        );

        if (nameColumnIndex === -1) {
          throw new Error("Selected name column not found");
        }

        const createdCards = [];

        for (const row of fileData) {
          const recipientName = row[nameColumnIndex];
          if (!recipientName?.trim()) continue;

          const cardData = {
            templateId: selectedTemplate,
            recipientName: recipientName.trim(),
            customMessage: bulkCustomMessage.trim() || undefined,
          };

          const response = await fetch("/api/cards/issue", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cardData),
          });

          if (response.ok) {
            const newCard = await response.json();
            createdCards.push(newCard);
          }
        }

        toast({
          title: "Success!",
          description: `Successfully created ${createdCards.length} cards`,
        });
      }

      await fetchData(); // Refresh the cards list
      // Reset form
      setUploadedFile(null);
      setFileColumns([]);
      setFileData([]);
      setSelectedNameColumn("");
      setSelectedTimeColumn("");
      setSelectedEndTimeColumn("");
      setSelectedItemColumn("");
      setSelectedCoordinatorColumn("");
      setBulkCustomMessage("");
      setBulkEventName("");
      setBulkEventDate("");
      setBulkMcName("");
    } catch (error) {
      console.error("Error creating bulk cards:", error);
      toast({
        title: "Error",
        description: "Failed to create cards",
        variant: "destructive",
      });
    } finally {
      setIsBulkCreating(false);
    }
  };

  // Download functionality
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

  // Bulk download as ZIP
  const handleBulkDownload = async (format: "png" | "pdf") => {
    const cardsToDownload = filteredCards.filter((card) =>
      selectedCardIds.has(card.id)
    );

    if (cardsToDownload.length === 0) {
      toast({
        title: "Error",
        description: "Please select cards to download",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      for (const card of cardsToDownload) {
        try {
          const response = await fetch(
            `/api/cards/${card.id}/download?format=${format}`
          );
          if (response.ok) {
            const blob = await response.blob();
            const fileName = `${card.recipientName || "card"}-${
              card.id
            }.${format}`;
            zip.file(fileName, blob);
          }
        } catch (error) {
          console.error(`Failed to download card ${card.id}:`, error);
        }
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cards-${format}-${new Date().getTime()}.zip`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Success!",
        description: `Downloaded ${cardsToDownload.length} cards as ZIP`,
      });
    } catch (error) {
      console.error("Error creating ZIP:", error);
      toast({
        title: "Error",
        description: "Failed to create ZIP file",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete functionality
  const handleDeleteCard = async (cardId: string) => {
    if (!window.confirm("Are you sure you want to delete this card?")) {
      return;
    }

    try {
      const response = await fetch(`/api/cards/${cardId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Card deleted successfully",
        });
        await fetchData();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete card",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete card",
        variant: "destructive",
      });
    }
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    const cardsToDelete = filteredCards.filter((card) =>
      selectedCardIds.has(card.id)
    );

    if (cardsToDelete.length === 0) {
      toast({
        title: "Error",
        description: "Please select cards to delete",
        variant: "destructive",
      });
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to delete ${cardsToDelete.length} cards?`
      )
    ) {
      return;
    }

    setLoading(true);

    try {
      const deletePromises = cardsToDelete.map((card) =>
        fetch(`/api/cards/${card.id}`, { method: "DELETE" })
      );

      await Promise.all(deletePromises);
      toast({
        title: "Success!",
        description: `Deleted ${cardsToDelete.length} cards`,
      });
      await fetchData(); // Refresh the cards list
      setSelectedCardIds(new Set()); // Clear selection
    } catch (error) {
      console.error("Error deleting cards:", error);
      toast({
        title: "Error",
        description: "Failed to delete cards",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Card selection functions
  const toggleCardSelection = (cardId: string) => {
    const newSelected = new Set(selectedCardIds);
    if (newSelected.has(cardId)) {
      newSelected.delete(cardId);
    } else {
      newSelected.add(cardId);
    }
    setSelectedCardIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedCardIds.size === filteredCards.length) {
      setSelectedCardIds(new Set());
    } else {
      setSelectedCardIds(new Set(filteredCards.map((card) => card.id)));
    }
  };

  // Preview functionality
  const handlePreviewCard = (card: UserCard) => {
    setPreviewCard(card);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewCard(null);
  };

  // Initialize templates
  const handleInitializeTemplates = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/cards/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Success!",
          description: `Initialized ${data.count} card templates successfully`,
        });

        // Refresh data
        await fetchData();
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to initialize templates",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error initializing templates:", error);
      toast({
        title: "Error",
        description: "Failed to initialize templates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

        <div className="flex gap-2">
          <Button
            onClick={handleInitializeTemplates}
            variant="outline"
            className="border-pink-200 text-pink-600 hover:bg-pink-50"
            disabled={loading}
          >
            <Star className="mr-2 h-4 w-4" />
            {loading ? "Initializing..." : "Initialize"}
          </Button>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Card
          </Button>
        </div>
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
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="graduation">Graduation</SelectItem>
                <SelectItem value="appreciation">Appreciation</SelectItem>
                <SelectItem value="blessing">Blessing</SelectItem>
                <SelectItem value="congratulation">Congratulation</SelectItem>
                <SelectItem value="invitation">Invitation</SelectItem>
                <SelectItem value="celebration">Celebration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      {/* Bulk Upload Form */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="text-blue-700 flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Bulk Card Generation
          </CardTitle>{" "}
          <CardDescription>
            {selectedTemplate === "service-outline"
              ? "Upload a CSV file with service items - requires Time, Item, and Coordinator columns"
              : "Upload a CSV file to create multiple cards at once - requires a Name column"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Template Selection */}
            <div>
              <Label htmlFor="bulk-template-select">Card Template</Label>
              <Select
                value={selectedTemplate}
                onValueChange={setSelectedTemplate}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
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
                        {template.category === "invitation" && (
                          <Mail className="h-4 w-4 text-purple-500" />
                        )}
                        {template.category === "celebration" && (
                          <Sparkles className="h-4 w-4 text-orange-500" />
                        )}
                        {template.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* File Upload */}
            <div>
              <Label htmlFor="bulk-file-upload">Upload CSV File</Label>
              <Input
                id="bulk-file-upload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />{" "}
              <p className="text-sm text-muted-foreground mt-1">
                {selectedTemplate === "service-outline"
                  ? "CSV should contain Time, Item, and Coordinator columns for service planning"
                  : "CSV should contain recipient names and optional additional data"}
              </p>
            </div>
          </div>{" "}
          {/* Column Selection */}
          {fileColumns.length > 0 && (
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <Label className="text-sm font-medium mb-2 block">
                Column Mapping
              </Label>

              {selectedTemplate === "service-outline" ? (
                // Service Outline specific column mapping
                <div className="space-y-4">
                  {" "}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="time-column">Start Time Column</Label>{" "}
                      <Select
                        value={selectedTimeColumn}
                        onValueChange={setSelectedTimeColumn}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select start time column" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          {fileColumns.map((column, index) => (
                            <SelectItem
                              key={index}
                              value={column || `col_${index}`}
                            >
                              {column || `Column ${index + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="item-column">Item Column</Label>{" "}
                      <Select
                        value={selectedItemColumn}
                        onValueChange={setSelectedItemColumn}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select item column" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          {fileColumns.map((column, index) => (
                            <SelectItem
                              key={index}
                              value={column || `col_${index}`}
                            >
                              {column || `Column ${index + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="coordinator-column">
                        Coordinator Column
                      </Label>{" "}
                      <Select
                        value={selectedCoordinatorColumn}
                        onValueChange={setSelectedCoordinatorColumn}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select coordinator column" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          {fileColumns.map((column, index) => (
                            <SelectItem
                              key={index}
                              value={column || `col_${index}`}
                            >
                              {column || `Column ${index + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* Optional End Time Column */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="end-time-column">
                        End Time Column (Optional)
                      </Label>{" "}
                      <Select
                        value={selectedEndTimeColumn}
                        onValueChange={setSelectedEndTimeColumn}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select end time column (optional)" />
                        </SelectTrigger>{" "}
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          <SelectItem value="none">None</SelectItem>
                          {fileColumns.map((column, index) => (
                            <SelectItem
                              key={index}
                              value={column || `col_${index}`}
                            >
                              {column || `Column ${index + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-sm text-blue-800">
                      <div>
                        <strong>Preview:</strong> {fileData.length} service
                        items found
                      </div>
                      <div className="mt-1">
                        Start Time:{" "}
                        <strong>{selectedTimeColumn || "Not selected"}</strong>
                        {selectedEndTimeColumn && (
                          <>
                            {" "}
                            | End Time: <strong>{selectedEndTimeColumn}</strong>
                          </>
                        )}{" "}
                        | Item:{" "}
                        <strong>{selectedItemColumn || "Not selected"}</strong>{" "}
                        | Coordinator:{" "}
                        <strong>
                          {selectedCoordinatorColumn || "Not selected"}
                        </strong>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              ) : selectedTemplate === "graduates-name-list" ? (
                // Graduates Name List specific column mapping
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name-column">Name Column</Label>
                      <Select
                        value={selectedNameColumn}
                        onValueChange={setSelectedNameColumn}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select name column" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          {fileColumns.map((column, index) => (
                            <SelectItem
                              key={index}
                              value={column || `col_${index}`}
                            >
                              {column || `Column ${index + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="country-column">Country Column</Label>
                      <Select
                        value={selectedCountryColumn}
                        onValueChange={setSelectedCountryColumn}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country column" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          {fileColumns.map((column, index) => (
                            <SelectItem
                              key={index}
                              value={column || `col_${index}`}
                            >
                              {column || `Column ${index + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="university-column">
                        University Column
                      </Label>
                      <Select
                        value={selectedUniversityColumn}
                        onValueChange={setSelectedUniversityColumn}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select university column" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          {fileColumns.map((column, index) => (
                            <SelectItem
                              key={index}
                              value={column || `col_${index}`}
                            >
                              {column || `Column ${index + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="major-column">
                        Academic Major Column
                      </Label>
                      <Select
                        value={selectedMajorColumn}
                        onValueChange={setSelectedMajorColumn}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select major column" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          {fileColumns.map((column, index) => (
                            <SelectItem
                              key={index}
                              value={column || `col_${index}`}
                            >
                              {column || `Column ${index + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800">
                      <div>
                        <strong>Preview:</strong> {fileData.length} graduates
                        found
                      </div>
                      <div className="mt-1">
                        Name:{" "}
                        <strong>{selectedNameColumn || "Not selected"}</strong>
                        {" | "}Country:{" "}
                        <strong>
                          {selectedCountryColumn || "Not selected"}
                        </strong>
                        {" | "}University:{" "}
                        <strong>
                          {selectedUniversityColumn || "Not selected"}
                        </strong>
                        {" | "}Major:{" "}
                        <strong>{selectedMajorColumn || "Not selected"}</strong>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedTemplate === "meet-our-graduates" ? (
                // Meet Our Graduates specific column mapping (same as graduates-name-list plus additional fields)
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name-column">Name Column</Label>
                      <Select
                        value={selectedNameColumn}
                        onValueChange={setSelectedNameColumn}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select name column" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          {fileColumns.map((column, index) => (
                            <SelectItem
                              key={index}
                              value={column || `col_${index}`}
                            >
                              {column || `Column ${index + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="country-column">Country Column</Label>
                      <Select
                        value={selectedCountryColumn}
                        onValueChange={setSelectedCountryColumn}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country column" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          {fileColumns.map((column, index) => (
                            <SelectItem
                              key={index}
                              value={column || `col_${index}`}
                            >
                              {column || `Column ${index + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="university-column">
                        University Column
                      </Label>
                      <Select
                        value={selectedUniversityColumn}
                        onValueChange={setSelectedUniversityColumn}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select university column" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          {fileColumns.map((column, index) => (
                            <SelectItem
                              key={index}
                              value={column || `col_${index}`}
                            >
                              {column || `Column ${index + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="major-column">
                        Academic Major Column
                      </Label>
                      <Select
                        value={selectedMajorColumn}
                        onValueChange={setSelectedMajorColumn}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select major column" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          {fileColumns.map((column, index) => (
                            <SelectItem
                              key={index}
                              value={column || `col_${index}`}
                            >
                              {column || `Column ${index + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-sm text-blue-800">
                      <div>
                        <strong>Multi-Page Document:</strong> {fileData.length}{" "}
                        graduates will generate {fileData.length + 2} pages
                        (Church Info + Blessing + Individual Pages)
                      </div>
                      <div className="mt-1">
                        Each graduate will have their own page with photos,
                        information, and message.
                      </div>
                      <div className="mt-1">
                        <strong>Required:</strong> Name, Country, University,
                        Major |<strong> Auto-detected:</strong> Email, Phone,
                        Position, Message, Photos
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Standard name-based column mapping for other templates
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name-column">Name Column</Label>{" "}
                    <Select
                      value={selectedNameColumn}
                      onValueChange={setSelectedNameColumn}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select name column" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg">
                        {fileColumns.map((column, index) => (
                          <SelectItem
                            key={index}
                            value={column || `col_${index}`}
                          >
                            {column || `Column ${index + 1}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Preview: {fileData.length} recipients found</Label>
                    <div className="text-sm text-muted-foreground">
                      Names will be taken from:{" "}
                      <strong>{selectedNameColumn || "Not selected"}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Optional Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="bulk-custom-message">
                Custom Message (Optional)
              </Label>
              <Textarea
                id="bulk-custom-message"
                placeholder="Enter a message to apply to all cards (leave empty to use template default)"
                value={bulkCustomMessage}
                onChange={(e) => setBulkCustomMessage(e.target.value)}
                rows={2}
                disabled={!selectedTemplate}
              />
            </div>

            {/* Service Outline specific fields */}
            {selectedTemplate === "service-outline" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bulk-event-name">Event Name</Label>
                    <Input
                      id="bulk-event-name"
                      placeholder="e.g., JICF Graduation Service"
                      value={bulkEventName}
                      onChange={(e) => setBulkEventName(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bulk-event-date">Event Date</Label>
                    <Input
                      id="bulk-event-date"
                      placeholder="e.g., Sunday, June 15, 2025"
                      value={bulkEventDate}
                      onChange={(e) => setBulkEventDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bulk-mc-name">MC Name</Label>
                    <Input
                      id="bulk-mc-name"
                      placeholder="Master of Ceremony name"
                      value={bulkMcName}
                      onChange={(e) => setBulkMcName(e.target.value)}
                    />
                  </div>
                </div>{" "}
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-sm text-yellow-800 space-y-2">
                    <p>
                      📋 <strong>For Service Outline:</strong> The CSV file can
                      contain service items in additional columns, or you can
                      manually enter the service outline in the single card form
                      if needed.
                    </p>
                    <p>
                      🎓 <strong>For Graduates Name List:</strong> Upload a CSV
                      file with columns for Name, Country, University, and
                      Academic Major. The system will automatically create a
                      formatted graduates list.
                    </p>
                    <p>
                      💝 <strong>For Other Cards:</strong> Upload a CSV file
                      with a name column to create personalized cards for each
                      recipient.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>{" "}
          <div className="flex justify-end gap-2">
            <Button
              onClick={handleBulkCreateCards}
              disabled={
                isBulkCreating ||
                !selectedTemplate ||
                !fileData.length ||
                (selectedTemplate === "service-outline"
                  ? !selectedTimeColumn ||
                    !selectedItemColumn ||
                    !selectedCoordinatorColumn
                  : !selectedNameColumn)
              }
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isBulkCreating
                ? "Creating Cards..."
                : selectedTemplate === "service-outline"
                ? "Create Service Outline"
                : `Create ${fileData.length} Cards`}
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Create Single Card Form */}
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
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
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
                        {template.category === "invitation" && (
                          <Mail className="h-4 w-4 text-purple-500" />
                        )}
                        {template.category === "celebration" && (
                          <Sparkles className="h-4 w-4 text-orange-500" />
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

            {/* Additional fields for Service Outline template */}
            {selectedTemplate === "service-outline" && (
              <>
                <div>
                  <Label htmlFor="event-name">Event Name</Label>
                  <Input
                    id="event-name"
                    placeholder="e.g., JICF Graduation Service"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="event-date">Event Date</Label>
                  <Input
                    id="event-date"
                    placeholder="e.g., Sunday, June 15, 2025"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="mc-name">MC Name</Label>
                  <Input
                    id="mc-name"
                    placeholder="Master of Ceremony name"
                    value={mcName}
                    onChange={(e) => setMcName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="service-outline">Service Outline</Label>
                  <Textarea
                    id="service-outline"
                    placeholder="Enter service items, one per line:&#10;2:30 PM - Prelude (Media Person)&#10;2:55 PM - Welcome & Opening Prayer (MC)&#10;3:00 PM - Marching In of Graduates&#10;..."
                    value={serviceOutline}
                    onChange={(e) => setServiceOutline(e.target.value)}
                    rows={8}
                    className="font-mono text-sm"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Each line will appear as a separate item on the card
                  </p>
                </div>
              </>
            )}

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
      )}{" "}
      {/* Templates Grid */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Available Templates ({filteredTemplates.length})
          </h2>

          {/* Templates View Mode Toggle */}
          <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
              onClick={() => setTemplatesViewMode("grid")}
              variant={templatesViewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="h-8 px-2"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setTemplatesViewMode("list")}
              variant={templatesViewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="h-8 px-2"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>{" "}
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
          <div
            className={
              templatesViewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className={`hover:shadow-lg transition-shadow ${
                  templatesViewMode === "list" ? "flex flex-row" : ""
                }`}
              >
                {templatesViewMode === "list" ? (
                  // List View Layout
                  <>
                    <div className="flex-1">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {template.name}
                          </CardTitle>
                          <Badge variant="secondary" className="capitalize">
                            {template.category}
                          </Badge>
                        </div>
                        <CardDescription>
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {template.category === "graduation" && (
                              <Star className="h-6 w-6 text-yellow-500" />
                            )}
                            {template.category === "appreciation" && (
                              <Heart className="h-6 w-6 text-pink-400" />
                            )}
                            {template.category === "blessing" && (
                              <Gift className="h-6 w-6 text-blue-500" />
                            )}
                            {template.category === "congratulation" && (
                              <Star className="h-6 w-6 text-green-500" />
                            )}
                            {template.category === "invitation" && (
                              <Mail className="h-6 w-6 text-purple-500" />
                            )}
                            {template.category === "celebration" && (
                              <Sparkles className="h-6 w-6 text-orange-500" />
                            )}
                            {![
                              "graduation",
                              "appreciation",
                              "blessing",
                              "congratulation",
                              "invitation",
                              "celebration",
                            ].includes(template.category) && (
                              <Heart className="h-6 w-6 text-pink-400" />
                            )}
                            <span className="text-sm text-muted-foreground capitalize">
                              {template.category} Template
                            </span>
                          </div>
                          <Button
                            onClick={() => {
                              setSelectedTemplate(template.id);
                              setShowCreateForm(true);
                            }}
                            className="bg-pink-500 hover:bg-pink-600 text-white"
                          >
                            Use Template
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </>
                ) : (
                  // Grid View Layout (existing)
                  <>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {template.name}
                        </CardTitle>
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
                          {template.category === "graduation" && (
                            <Star className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
                          )}
                          {template.category === "appreciation" && (
                            <Heart className="mx-auto h-8 w-8 text-pink-400 mb-2" />
                          )}
                          {template.category === "blessing" && (
                            <Gift className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                          )}
                          {template.category === "congratulation" && (
                            <Star className="mx-auto h-8 w-8 text-green-500 mb-2" />
                          )}
                          {template.category === "invitation" && (
                            <Mail className="mx-auto h-8 w-8 text-purple-500 mb-2" />
                          )}
                          {template.category === "celebration" && (
                            <Sparkles className="mx-auto h-8 w-8 text-orange-500 mb-2" />
                          )}
                          {![
                            "graduation",
                            "appreciation",
                            "blessing",
                            "congratulation",
                            "invitation",
                            "celebration",
                          ].includes(template.category) && (
                            <Heart className="mx-auto h-8 w-8 text-pink-400 mb-2" />
                          )}
                          <p className="text-sm text-muted-foreground">
                            Preview
                          </p>
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
                  </>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
      <Separator />
      {/* User's Created Cards */}
      <div>
        {" "}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Gift className="h-5 w-5 text-blue-500" />
            Your Cards ({userCards.length})
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                onClick={() => setViewMode("grid")}
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-2"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setViewMode("list")}
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-2"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Bulk Operations Controls */}
            {userCards.length > 0 && (
              <>
                <Button
                  onClick={toggleSelectAll}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  {selectedCardIds.size === filteredCards.length
                    ? "Deselect All"
                    : "Select All"}
                </Button>

                {selectedCardIds.size > 0 && (
                  <>
                    <Badge variant="secondary" className="px-2 py-1">
                      {selectedCardIds.size} selected
                    </Badge>

                    <Button
                      onClick={() => handleBulkDownload("png")}
                      variant="outline"
                      size="sm"
                      disabled={loading}
                    >
                      <Download className="mr-1 h-3 w-3" />
                      PNG ZIP
                    </Button>

                    <Button
                      onClick={() => handleBulkDownload("pdf")}
                      variant="outline"
                      size="sm"
                      disabled={loading}
                    >
                      <Download className="mr-1 h-3 w-3" />
                      PDF ZIP
                    </Button>

                    <Button
                      onClick={handleBulkDelete}
                      variant="destructive"
                      size="sm"
                      disabled={loading}
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      Delete
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        {userCards.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Gift className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                You haven&apos;t created any cards yet.
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
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredCards.map((card) => (
              <Card
                key={card.id}
                className={`hover:shadow-lg transition-shadow ${
                  selectedCardIds.has(card.id) ? "ring-2 ring-blue-500" : ""
                } ${viewMode === "list" ? "flex flex-row" : ""}`}
              >
                {viewMode === "list" ? (
                  // List View Layout
                  <>
                    <div className="flex-1">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedCardIds.has(card.id)}
                              onChange={() => toggleCardSelection(card.id)}
                              className="rounded border-gray-300"
                            />
                            <CardTitle className="text-lg">
                              {card.templateName}
                            </CardTitle>
                          </div>
                          <Badge variant="outline">
                            {new Date(card.createdAt).toLocaleDateString()}
                          </Badge>
                        </div>
                        {card.recipientName && (
                          <CardDescription>
                            For: {card.recipientName}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            {card.customMessage && (
                              <div className="mb-2 p-2 bg-muted rounded text-sm">
                                <p className="italic truncate">
                                  &quot;{card.customMessage}&quot;
                                </p>
                              </div>
                            )}
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span>Downloads: {card.downloadCount}</span>
                              <span>Views: {card.viewCount}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              onClick={() => handlePreviewCard(card)}
                              variant="default"
                              size="sm"
                              className="bg-pink-500 hover:bg-pink-600 text-white"
                            >
                              <Eye className="mr-1 h-4 w-4" />
                              View
                            </Button>
                            <Button
                              onClick={() => handleDownload(card.id, "png")}
                              variant="outline"
                              size="sm"
                            >
                              <Download className="mr-1 h-4 w-4" />
                              PNG
                            </Button>
                            <Button
                              onClick={() => handleDownload(card.id, "pdf")}
                              variant="outline"
                              size="sm"
                            >
                              <Download className="mr-1 h-4 w-4" />
                              PDF
                            </Button>
                            <Button
                              onClick={() => handleDeleteCard(card.id)}
                              variant="destructive"
                              size="sm"
                              disabled={loading}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </>
                ) : (
                  // Grid View Layout (existing)
                  <>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedCardIds.has(card.id)}
                            onChange={() => toggleCardSelection(card.id)}
                            className="rounded border-gray-300"
                          />
                          <CardTitle className="text-lg">
                            {card.templateName}
                          </CardTitle>
                        </div>
                        <Badge variant="outline">
                          {new Date(card.createdAt).toLocaleDateString()}
                        </Badge>
                      </div>
                      {card.recipientName && (
                        <CardDescription>
                          For: {card.recipientName}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      {card.customMessage && (
                        <div className="mb-4 p-3 bg-muted rounded-lg">
                          <p className="text-sm italic">
                            &quot;{card.customMessage}&quot;
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                        <span>Downloads: {card.downloadCount}</span>
                        <span>Views: {card.viewCount}</span>
                      </div>

                      <div className="space-y-2">
                        <Button
                          onClick={() => handlePreviewCard(card)}
                          variant="default"
                          size="sm"
                          className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Card
                        </Button>
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
                          <Button
                            onClick={() => handleDeleteCard(card.id)}
                            variant="destructive"
                            size="sm"
                            disabled={loading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
      {/* Card Preview Modal */}
      {isPreviewOpen && previewCard && (
        <CardPreviewModal
          isOpen={isPreviewOpen}
          card={previewCard}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
}
