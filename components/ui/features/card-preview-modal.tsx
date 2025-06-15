import React from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  FileImage,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Card {
  id: string;
  templateId: string;
  templateName: string;
  recipientName?: string;
  customMessage?: string;
  createdAt: string;
  downloadCount: number;
  viewCount: number;
}

interface CardPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: Card;
}

export function CardPreviewModal({
  isOpen,
  onClose,
  card,
}: CardPreviewModalProps) {
  const [zoom, setZoom] = React.useState(1);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [cardImage, setCardImage] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  const fetchCardPreview = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/cards/${card.id}`);
      if (response.ok) {
        const data = await response.json();
        setCardImage(data.htmlContent || "");
      }
    } catch (error) {
      console.error("Error fetching card preview:", error);
    } finally {
      setLoading(false);
    }
  }, [card.id]);

  React.useEffect(() => {
    if (isOpen && card) {
      fetchCardPreview();
    }
  }, [isOpen, card, fetchCardPreview]);

  const handleDownload = async (format: "png" | "pdf") => {
    try {
      setIsDownloading(true);
      const response = await fetch(
        `/api/cards/${card.id}/download?format=${format}`
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `card-${card.id}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Error downloading card:", error);
    } finally {
      setIsDownloading(false);
    }
  };
  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.3));
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex flex-col"
      onClick={(e) => {
        // Close when clicking the backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {card.templateName}
            </h2>
            {card.recipientName && (
              <p className="text-sm text-gray-600">For: {card.recipientName}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomOut}
              className="h-7 w-7 p-0"
              disabled={zoom <= 0.3}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm px-2 min-w-[60px] text-center font-medium">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomIn}
              className="h-7 w-7 p-0"
              disabled={zoom >= 2}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Download Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={isDownloading}
                className="bg-white hover:bg-gray-50"
              >
                <Download className="mr-2 h-4 w-4" />
                {isDownloading ? "Downloading..." : "Download"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
              <DropdownMenuItem
                onClick={() => handleDownload("png")}
                className="hover:bg-pink-50 cursor-pointer"
              >
                <FileImage className="mr-2 h-4 w-4" />
                Download as PNG
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDownload("pdf")}
                className="hover:bg-pink-50 cursor-pointer"
              >
                <FileText className="mr-2 h-4 w-4" />
                Download as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="min-h-full flex items-center justify-center p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mb-4"></div>
              <p className="text-white text-sm">Loading card preview...</p>
            </div>
          ) : (
            <div className="relative">
              {/* Card Shadow */}
              <div className="absolute top-4 left-4 bg-black/30 rounded-lg blur-sm w-full h-full" />{" "}
              {/* Card Container */}
              <div
                className="relative max-w-[90vw] max-h-[80vh]"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "center center",
                }}
              >
                {cardImage ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: cardImage }}
                    className="bg-white rounded-lg shadow-2xl border border-gray-300"
                  />
                ) : (
                  <div className="w-96 h-64 flex flex-col items-center justify-center bg-gray-100 text-gray-500 p-8">
                    <div className="text-center">
                      <div className="text-4xl mb-4">💳</div>
                      <h3 className="text-lg font-medium mb-2">
                        Card preview not available
                      </h3>
                      <p className="text-sm">
                        The card content could not be loaded.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Created:</span>{" "}
            {new Date(card.createdAt).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">Downloads:</span> {card.downloadCount}
          </div>
          <div>
            <span className="font-medium">Views:</span> {card.viewCount}
          </div>
          {card.customMessage && (
            <div className="w-full">
              <span className="font-medium">Message:</span> &quot;
              {card.customMessage}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
