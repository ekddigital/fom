"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Download, FileText, ImageIcon } from "lucide-react";

export interface FormatSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: (format: "pdf" | "png") => void;
  title?: string;
  description?: string;
  certificateName?: string;
  isBulkDownload?: boolean;
}

export function FormatSelectionDialog({
  open,
  onOpenChange,
  onDownload,
  title = "Download Certificate",
  description = "Choose the format for downloading your certificate.",
  certificateName = "Certificate",
  isBulkDownload = false,
}: FormatSelectionDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "png">("pdf");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await onDownload(selectedFormat);
      onOpenChange(false);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-2 border-gray-200 shadow-2xl backdrop-blur-sm">
        <DialogHeader className="pb-4 border-b border-gray-100">
          <DialogTitle className="flex items-center gap-2 text-gray-900 text-lg font-semibold">
            <Download className="h-5 w-5 text-blue-600" />
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-sm mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label className="text-sm font-medium text-gray-800 mb-3 block">
              Select Format:
            </Label>
            <RadioGroup
              value={selectedFormat}
              onValueChange={(value) =>
                setSelectedFormat(value as "pdf" | "png")
              }
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 bg-white">
                <RadioGroupItem
                  value="pdf"
                  id="pdf"
                  className="border-gray-400"
                />
                <div className="flex items-center space-x-3 flex-1">
                  <FileText className="h-8 w-8 text-red-500" />
                  <div>
                    <Label
                      htmlFor="pdf"
                      className="font-medium cursor-pointer text-gray-900"
                    >
                      PDF Document
                    </Label>
                    <p className="text-sm text-gray-600">
                      Vector format, perfect for printing and professional use
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 bg-white">
                <RadioGroupItem
                  value="png"
                  id="png"
                  className="border-gray-400"
                />
                <div className="flex items-center space-x-3 flex-1">
                  <ImageIcon className="h-8 w-8 text-blue-500" />
                  <div>
                    <Label
                      htmlFor="png"
                      className="font-medium cursor-pointer text-gray-900"
                    >
                      PNG Image
                    </Label>
                    <p className="text-sm text-gray-600">
                      High-quality image, perfect for sharing and web use
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="p-4 bg-blue-100 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>
                {isBulkDownload ? "ZIP file name:" : "File name:"}
              </strong>{" "}
              {isBulkDownload
                ? `certificates_${selectedFormat}_bulk_download.zip`
                : `${certificateName}-${selectedFormat.toUpperCase()}`}
            </p>
            {isBulkDownload && (
              <p className="text-xs text-blue-800 mt-1">
                📦 All certificates will be packaged in a single ZIP file
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isDownloading}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="min-w-[120px] bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              {isDownloading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Downloading...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download {selectedFormat.toUpperCase()}
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
