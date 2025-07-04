import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  TemplateData,
  TemplateElement,
  generateCertificateId,
} from "@/lib/utils/certificate";
import { getVerificationUrl } from "@/lib/utils/url";
import { generateCertificateQRCode } from "@/lib/utils/qr-code-generator";
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  Copy,
  FileImage,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CertificatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: TemplateData;
  recipientName?: string;
  issuerName?: string;
  issueDate?: string;
  position?: string; // For JICF certificates
  gender?: string; // For JICF certificates
  pastorName?: string; // For JICF certificates
}

export function CertificatePreviewModal({
  isOpen,
  onClose,
  template,
  recipientName = "Sample Recipient",
  issuerName = "Sample Issuer",
  issueDate = new Date().toLocaleDateString(),
  position = "Sample Position",
  gender = "his/her",
  pastorName = "Pst. Joseph G. Summers",
}: CertificatePreviewModalProps) {
  const [zoom, setZoom] = React.useState(1);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState<string>("");
  const certificateRef = React.useRef<HTMLDivElement>(null);

  // Generate a sample certificate ID based on the template
  const certificateId = React.useMemo(() => {
    return generateCertificateId(template.name || "Certificate", 1);
  }, [template.name]);

  // Sample security features for preview - using environment-aware URL
  const sampleVerificationUrl = React.useMemo(() => {
    return getVerificationUrl(certificateId);
  }, [certificateId]);

  // Generate QR Code using centralized ultra-scannable QR code generator
  React.useEffect(() => {
    const generateQRCode = async () => {
      try {
        console.log("Generating QR code for URL:", sampleVerificationUrl);
        // Use the same ultra-scannable QR code logic as downloads (DRY principle)
        const qrDataUrl = await generateCertificateQRCode(
          sampleVerificationUrl
        );
        console.log(
          "QR code generated successfully:",
          qrDataUrl.substring(0, 50) + "..."
        );
        setQrCodeDataUrl(qrDataUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
        // Fallback to a simple data URL if QR generation fails
        const fallbackQr =
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjYiPlFSIENvZGU8L3RleHQ+PC9zdmc+";
        console.log("Using fallback QR code");
        setQrCodeDataUrl(fallbackQr);
      }
    };

    if (isOpen) {
      generateQRCode();
    }
  }, [sampleVerificationUrl, setQrCodeDataUrl, isOpen]);

  // Download functions
  const downloadAsPNG = async () => {
    if (!certificateRef.current) return;

    setIsDownloading(true);
    try {
      // Add safe class before capturing
      certificateRef.current.classList.add("html2canvas-safe");

      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: template.pageSettings.background?.color || "#ffffff",
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        onclone: (clonedDoc) => {
          // Ensure the cloned document also has the safe class
          const clonedElement = clonedDoc.querySelector(
            "[data-html2canvas-safe]"
          );
          if (clonedElement) {
            clonedElement.classList.add("html2canvas-safe");
          }
        },
      });

      // Remove safe class after capturing
      certificateRef.current.classList.remove("html2canvas-safe");

      const link = document.createElement("a");
      link.download = `${
        template.name || "certificate"
      }-${recipientName.replace(/\s+/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error downloading PNG:", error);
      // Ensure class is removed even on error
      certificateRef.current?.classList.remove("html2canvas-safe");
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAsPDF = async () => {
    if (!certificateRef.current) return;

    setIsDownloading(true);
    try {
      // Add safe class before capturing
      certificateRef.current.classList.add("html2canvas-safe");

      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: template.pageSettings.background?.color || "#ffffff",
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        onclone: (clonedDoc) => {
          // Ensure the cloned document also has the safe class
          const clonedElement = clonedDoc.querySelector(
            "[data-html2canvas-safe]"
          );
          if (clonedElement) {
            clonedElement.classList.add("html2canvas-safe");
          }
        },
      });

      // Remove safe class after capturing
      certificateRef.current.classList.remove("html2canvas-safe");

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation:
          template.pageSettings.width > template.pageSettings.height
            ? "landscape"
            : "portrait",
        unit: "px",
        format: [template.pageSettings.width, template.pageSettings.height],
      });

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        template.pageSettings.width,
        template.pageSettings.height
      );
      pdf.save(
        `${template.name || "certificate"}-${recipientName.replace(
          /\s+/g,
          "-"
        )}.pdf`
      );
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Ensure class is removed even on error
      certificateRef.current?.classList.remove("html2canvas-safe");
    } finally {
      setIsDownloading(false);
    }
  };

  // Calculate the best fit zoom based on viewport
  React.useEffect(() => {
    if (isOpen) {
      const viewportWidth = window.innerWidth * 0.9; // 90% of viewport width
      const viewportHeight = window.innerHeight * 0.8; // 80% of viewport height

      const scaleX = viewportWidth / template.pageSettings.width;
      const scaleY = viewportHeight / template.pageSettings.height;
      const bestFitZoom = Math.min(scaleX, scaleY, 2); // Max zoom of 2

      setZoom(Math.max(0.5, bestFitZoom)); // Min zoom of 0.5
    }
  }, [isOpen, template.pageSettings.width, template.pageSettings.height]);

  // Debug: Log template elements to see what we're working with
  React.useEffect(() => {
    if (isOpen && template) {
      console.log("Template elements:", template.elements);
      console.log(
        "QR elements:",
        template.elements.filter(
          (el) => el.id.includes("qr") || el.content.includes("qr")
        )
      );
      console.log(
        "Security elements:",
        template.elements.filter(
          (el) =>
            el.content.includes("{{qrCode}}") ||
            el.content.includes("{{verificationUrl}}") ||
            el.id.includes("security") ||
            el.id.includes("watermark")
        )
      );
    }
  }, [isOpen, template]);

  // Function to calculate dynamic sizing for JICF certificate fields
  const applyDynamicSizing = (
    element: TemplateElement,
    formData: { position?: string; recipientName?: string }
  ) => {
    let fontSize = element.style.fontSize;
    let height = element.position.height;
    let lineHeight = element.style.lineHeight || "1.2";

    // Dynamic sizing for position field
    if (element.id === "position-served" && formData?.position) {
      const positionText = formData.position;
      const textLength = positionText.length;
      const semicolonCount = (positionText.match(/;/g) || []).length;
      const hasMultipleRoles = semicolonCount > 0;

      if (textLength > 80 || (hasMultipleRoles && textLength > 50)) {
        fontSize = 14;
        height = 60;
        lineHeight = "1.3";
      } else if (textLength > 60 || (hasMultipleRoles && textLength > 30)) {
        fontSize = 16;
        height = 50;
        lineHeight = "1.3";
      } else if (textLength > 40) {
        fontSize = 18;
        height = 40;
      } else if (textLength > 25) {
        fontSize = 20;
        height = 35;
      } else {
        fontSize = 22;
        height = 30;
      }
    }

    // Dynamic sizing for recipient name field
    if (element.id === "recipient-name" && formData?.recipientName) {
      const nameText = formData.recipientName;
      const nameLength = nameText.length;

      if (nameLength > 30) {
        fontSize = 28;
        height = 55;
      } else if (nameLength > 20) {
        fontSize = 32;
        height = 50;
      } else {
        fontSize = 36;
        height = 45;
      }
    }

    return { fontSize, height, lineHeight };
  };

  // Replace template variables with sample data
  const replaceVariables = (content: string): string => {
    return (
      content
        // Handle double brace format (template builder)
        .replace(
          /\{\{recipientName\}\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">${recipientName}</span>`
        )
        .replace(
          /\{\{issuerName\}\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">${issuerName}</span>`
        )
        .replace(
          /\{\{issueDate\}\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">${issueDate}</span>`
        )
        .replace(
          /\{\{baptismDate\}\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">${issueDate}</span>`
        )
        .replace(
          /\{\{serviceYears\}\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">5</span>`
        )
        .replace(
          /\{\{volunteerHours\}\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">120</span>`
        )
        .replace(
          /\{\{missionLocation\}\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">Tanzania</span>`
        )
        .replace(
          /\{\{achievementArea\}\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">Bible Study</span>`
        )
        .replace(
          /\{\{certificateId\}\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">${certificateId}</span>`
        )
        .replace(
          /\{\{verificationUrl\}\}/g,
          `<span style="color: #0066cc; text-decoration: underline;">${sampleVerificationUrl}</span>`
        )

        // JICF Certificate of Service specific variables
        .replace(
          /\{\{gender\}\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">${
            gender === "Male" ? "his" : gender === "Female" ? "her" : "his/her"
          }</span>`
        )
        .replace(
          /\{\{position\}\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">${position}</span>`
        )
        .replace(
          /\{\{pastorName\}\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">${pastorName}</span>`
        )

        // Handle single brace format (issued certificates)
        .replace(
          /\{recipientName\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">${recipientName}</span>`
        )
        .replace(
          /\{issuerName\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">${issuerName}</span>`
        )
        .replace(
          /\{issueDate\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">${issueDate}</span>`
        )
        .replace(
          /\{certificateId\}/g,
          `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">${certificateId}</span>`
        )
        .replace(
          /\{verificationUrl\}/g,
          `<span style="color: #0066cc; text-decoration: underline;">${sampleVerificationUrl}</span>`
        )

        // Clean up any remaining empty braces
        .replace(/\{\s*\}/g, "")
        .replace(/\{[^}]*\}/g, (match) => {
          const content = match.slice(1, -1).trim();
          return content
            ? `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 1px;">${content}</span>`
            : "";
        })
    );
  };

  // Function to replace image variables
  const replaceImageVariables = (content: string) => {
    console.log("Replacing image variables in content:", content);
    console.log("Current QR code data URL available:", !!qrCodeDataUrl);

    const result = content
      .replace(
        /\{\{qrCode\}\}/g,
        qrCodeDataUrl ||
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjYiPlFSIENvZGU8L3RleHQ+PC9zdmc+"
      )
      .replace(
        /\{qrCode\}/g,
        qrCodeDataUrl ||
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjYiPlFSIENvZGU8L3RleHQ+PC9zdmc+"
      )
      // JICF Certificate of Service pastor signature
      .replace(/\{\{pastorSignature\}\}/g, "/pastor_Joe_signaturepng.png")
      .replace(/\{pastorSignature\}/g, "/pastor_Joe_signaturepng.png");

    console.log("Result after replacement:", result);
    return result;
  };

  // Enhanced close handler with debugging
  const handleClose = React.useCallback(() => {
    console.log("Close button clicked");
    onClose();
  }, [onClose]);

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        console.log("Escape key pressed");
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex flex-col"
      onClick={(e) => {
        // Close when clicking the backdrop
        if (e.target === e.currentTarget) {
          console.log("Backdrop clicked");
          handleClose();
        }
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{template.name}</h2>
            <p className="text-sm text-gray-600">Certificate Preview</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom(Math.max(0.3, zoom - 0.1))}
              className="h-7 w-7 p-0"
              disabled={zoom <= 0.3}
            >
              <ZoomOut className="h-3 w-3" />
            </Button>
            <span className="text-xs font-medium px-2 min-w-[50px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom(Math.min(3, zoom + 0.1))}
              className="h-7 w-7 p-0"
              disabled={zoom >= 3}
            >
              <ZoomIn className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const viewportWidth = window.innerWidth * 0.9;
              const viewportHeight = window.innerHeight * 0.8;
              const scaleX = viewportWidth / template.pageSettings.width;
              const scaleY = viewportHeight / template.pageSettings.height;
              const bestFitZoom = Math.min(scaleX, scaleY, 2);
              setZoom(Math.max(0.3, bestFitZoom));
            }}
            className="text-xs h-7"
          >
            Fit Screen
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 h-7 text-xs"
                disabled={isDownloading}
              >
                <Download className="h-3 w-3" />
                {isDownloading ? "Downloading..." : "Download"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white border border-gray-200 shadow-lg"
            >
              <DropdownMenuItem
                onClick={downloadAsPNG}
                className="hover:bg-blue-50 cursor-pointer"
              >
                <FileImage className="h-4 w-4 mr-2" />
                <span className="text-gray-900">Download as PNG</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={downloadAsPDF}
                className="hover:bg-blue-50 cursor-pointer"
              >
                <FileText className="h-4 w-4 mr-2" />
                <span className="text-gray-900">Download as PDF</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="min-h-full flex items-center justify-center p-8">
          <div className="relative">
            {/* Certificate Shadow */}
            <div
              className="absolute top-4 left-4 bg-black/30 rounded-lg blur-sm"
              style={{
                width: `${template.pageSettings.width * zoom}px`,
                height: `${template.pageSettings.height * zoom}px`,
              }}
            />

            {/* Certificate Container */}
            <div
              ref={certificateRef}
              data-html2canvas-safe="true"
              className="relative bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-300"
              style={{
                width: `${template.pageSettings.width * zoom}px`,
                height: `${template.pageSettings.height * zoom}px`,
                backgroundColor:
                  template.pageSettings.background?.color || "#ffffff",
                backgroundImage: template.pageSettings.background?.image
                  ? `url(${template.pageSettings.background.image})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Certificate Elements */}
              {template.elements.map((element) => {
                // Apply dynamic sizing for JICF certificate fields
                const dynamicSizing = applyDynamicSizing(element, {
                  position: position,
                  recipientName: recipientName,
                });

                const elementStyle: React.CSSProperties = {
                  position: "absolute",
                  left: `${element.position.x * zoom}px`,
                  top: `${element.position.y * zoom}px`,
                  width: `${element.position.width * zoom}px`,
                  height: `${dynamicSizing.height * zoom}px`,
                  fontSize: dynamicSizing.fontSize
                    ? `${dynamicSizing.fontSize * zoom}px`
                    : undefined,
                  fontFamily: element.style.fontFamily || "serif",
                  fontWeight: element.style.fontWeight || "normal",
                  color: element.style.color || "#000000",
                  textAlign: element.style.textAlign || "left",
                  backgroundColor:
                    element.type === "shape" ? element.style.color : undefined,
                  borderRadius: element.style.borderRadius || undefined,
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    element.style.textAlign === "center"
                      ? "center"
                      : element.style.textAlign === "right"
                      ? "flex-end"
                      : "flex-start",
                  overflow: "hidden",
                  lineHeight: dynamicSizing.lineHeight,
                };

                if (element.type === "text") {
                  return (
                    <div
                      key={element.id}
                      style={elementStyle}
                      dangerouslySetInnerHTML={{
                        __html: replaceVariables(element.content),
                      }}
                    />
                  );
                }

                if (element.type === "image") {
                  const imageSrc = replaceImageVariables(element.content);
                  return (
                    <div key={element.id} style={elementStyle}>
                      <Image
                        src={imageSrc}
                        alt="Certificate Image"
                        width={element.position.width * zoom}
                        height={element.position.height * zoom}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          borderRadius: element.style.borderRadius || "0px", // Apply template borderRadius
                          border: "none", // Ensure no browser default border
                          outline: "none", // Ensure no outline
                          boxShadow: "none", // Ensure no box shadow
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                  );
                }

                if (element.type === "shape") {
                  return <div key={element.id} style={elementStyle} />;
                }

                return null;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Bar */}
      <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 p-3">
        <div className="flex items-center justify-center gap-8 text-xs text-gray-600">
          <span className="flex items-center gap-2">
            <strong>Certificate ID:</strong>
            <code className="bg-gray-100 px-2 py-1 rounded font-mono text-green-700 font-semibold">
              {certificateId}
            </code>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0 hover:bg-gray-200"
              onClick={() => {
                navigator.clipboard.writeText(certificateId);
                // You could add a toast notification here
              }}
              title="Copy Certificate ID"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </span>
          <span>
            <strong>Size:</strong> {template.pageSettings.width}x
            {template.pageSettings.height}px
          </span>
          <span>
            <strong>Elements:</strong> {template.elements.length}
          </span>
          <span>
            <strong>Recipient:</strong> {recipientName}
          </span>
          <span>
            <strong>Date:</strong> {issueDate}
          </span>
        </div>
      </div>
    </div>
  );
}
