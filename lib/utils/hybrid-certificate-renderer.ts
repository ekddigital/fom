/**
 * Hybrid Certificate Renderer
 * Combines template data with actual website assets for pixel-perfect rendering
 */

import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";
import QRCode from "qrcode";
import { getVerificationUrl } from "./url";

export interface CertificateData {
  id: string;
  templateName: string;
  recipientFirstName: string;
  recipientLastName: string;
  recipientEmail: string;
  authorizingOfficial?: string; // Optional authorizing official field
  issueDate: Date;
  templateData: TemplateData;
  qrCodeData?: string; // QR code path or data URL
  verificationUrl?: string; // URL for certificate verification
  verificationId?: string; // Verification ID for the certificate
  [key: string]: unknown;
}

export interface TemplateData {
  elements: TemplateElement[];
  pageSettings: PageSettings;
  [key: string]: unknown;
}

export interface TemplateElement {
  id: string;
  type: "text" | "image" | "shape" | "qr";
  content: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  style: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    textAlign?: string;
    fontFamily?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    [key: string]: unknown;
  };
}

export interface PageSettings {
  width: number;
  height: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  background?: {
    color?: string;
    border?: string;
    borderColor?: string;
    borderWidth?: number;
  };
}

// Certificate size presets
export const CERTIFICATE_PRESETS = {
  "landscape-a4": { width: 1122, height: 794 },
  "portrait-a4": { width: 794, height: 1122 },
  "standard-4-3": { width: 800, height: 600 },
  "wide-5-3": { width: 1000, height: 600 },
  square: { width: 600, height: 600 },
  banner: { width: 1200, height: 400 },
  "letter-landscape": { width: 1056, height: 816 },
  "letter-portrait": { width: 816, height: 1056 },
};

export class HybridCertificateRenderer {
  private certificate: CertificateData;
  private templateData: TemplateData;
  private elements: TemplateElement[];
  private pageSettings: PageSettings;
  private baseUrl: string;

  constructor(certificate: CertificateData, baseUrl?: string) {
    console.log("🏗️ HybridCertificateRenderer constructor:", {
      certificateId: certificate.id,
      hasQrCodeData: !!certificate.qrCodeData,
      qrCodeData: certificate.qrCodeData,
      hasVerificationUrl: !!certificate.verificationUrl,
      verificationUrl: certificate.verificationUrl,
      elementsCount: certificate.templateData?.elements?.length || 0,
    });

    this.certificate = certificate;
    this.templateData = certificate.templateData;
    this.elements = this.templateData?.elements || [];
    this.pageSettings =
      this.templateData?.pageSettings || CERTIFICATE_PRESETS["standard-4-3"];
    this.baseUrl =
      baseUrl || process.env.NEXTAUTH_URL || "http://localhost:3000";

    // Ensure page settings have defaults
    this.pageSettings = {
      width: this.pageSettings.width || 800,
      height: this.pageSettings.height || 600,
      margin: this.pageSettings.margin || {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
      background: this.pageSettings.background || {
        color: "#ffffff",
        border: "2px solid #2563eb",
      },
    };
  }

  /**
   * Generate QR code as base64 data URL
   */
  private async generateQRCodeDataURL(url: string): Promise<string> {
    try {
      console.log(`Generating QR code for URL: ${url}`);
      const qrCodeDataURL = await QRCode.toDataURL(url, {
        errorCorrectionLevel: "H",
        margin: 1,
        scale: 8,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      console.log(
        `QR code generated successfully, length: ${qrCodeDataURL.length}`
      );
      return qrCodeDataURL;
    } catch (error) {
      console.warn(`Failed to generate QR code for URL: ${url}`, error);
      // Return a simple placeholder base64 image if QR generation fails
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
    }
  }

  /**
   * Generate QR code as base64 data URL
   */
  private async generateQRCodeBase64(data: string): Promise<string> {
    try {
      console.log("🔍 QR Code generation started:", { data });

      const qrCodeDataUrl = await QRCode.toDataURL(data, {
        errorCorrectionLevel: "H",
        margin: 1,
        scale: 8,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });

      console.log("✅ QR Code generated successfully:", {
        dataLength: qrCodeDataUrl.length,
        prefix: qrCodeDataUrl.substring(0, 50) + "...",
      });

      return qrCodeDataUrl;
    } catch (error) {
      console.error("❌ QR Code generation failed:", error);
      throw error;
    }
  }

  /**
   * Convert images to base64 for embedding
   */
  private async imageToBase64(imagePath: string): Promise<string> {
    try {
      // Handle different types of image paths
      if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        // External URL - fetch and convert
        const response = await fetch(imagePath);
        if (!response.ok)
          throw new Error(`Failed to fetch image: ${imagePath}`);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const contentType = response.headers.get("content-type") || "image/png";
        return `data:${contentType};base64,${buffer.toString("base64")}`;
      } else if (imagePath.startsWith("/")) {
        // Absolute path from public directory
        const publicPath = path.join(
          process.cwd(),
          "public",
          imagePath.substring(1)
        );
        try {
          const buffer = await fs.readFile(publicPath);
          const ext = path.extname(imagePath).toLowerCase();
          const mimeType =
            ext === ".jpg" || ext === ".jpeg"
              ? "image/jpeg"
              : ext === ".png"
              ? "image/png"
              : ext === ".gif"
              ? "image/gif"
              : ext === ".svg"
              ? "image/svg+xml"
              : "image/png";
          return `data:${mimeType};base64,${buffer.toString("base64")}`;
        } catch {
          // If file doesn't exist locally, try to fetch from the website
          const fullUrl = `${this.baseUrl}${imagePath}`;
          const response = await fetch(fullUrl);
          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const contentType =
              response.headers.get("content-type") || "image/png";
            return `data:${contentType};base64,${buffer.toString("base64")}`;
          }
        }
      }

      // Return original path if conversion fails
      return imagePath;
    } catch (error) {
      console.warn(`Failed to convert image to base64: ${imagePath}`, error);
      return imagePath;
    }
  }

  /**
   * Process template elements and replace placeholders with actual data
   */
  private async processElements(): Promise<TemplateElement[]> {
    const recipientName =
      `${this.certificate.recipientFirstName} ${this.certificate.recipientLastName}`.trim();
    const issueDate = new Date(this.certificate.issueDate).toLocaleDateString();
    const issuerName = this.certificate.authorizingOfficial || "Hetawk"; // Use provided authorizing official or default

    const processedElements: TemplateElement[] = [];

    for (const element of this.elements) {
      if (element.type === "text" && element.content) {
        let content = element.content;

        // Enhanced placeholder replacement with clean styling (no underlines)
        content = content
          // Double brace format (templates) - clean styling without underlines
          .replace(
            /\{\{recipientName\}\}/g,
            `<span style="font-weight: 600; color: inherit;">${recipientName}</span>`
          )
          .replace(
            /\{\{certificateId\}\}/g,
            `<span style="font-weight: 600; color: inherit;">${this.certificate.id}</span>`
          )
          .replace(
            /\{\{issueDate\}\}/g,
            `<span style="font-weight: 600; color: inherit;">${issueDate}</span>`
          )
          .replace(
            /\{\{issuerName\}\}/g,
            `<span style="font-weight: 600; color: inherit;">${issuerName}</span>`
          )

          // Single brace format - clean styling without underlines
          .replace(
            /\{recipientName\}/g,
            `<span style="font-weight: 600; color: inherit;">${recipientName}</span>`
          )
          .replace(
            /\{certificateId\}/g,
            `<span style="font-weight: 600; color: inherit;">${this.certificate.id}</span>`
          )
          .replace(
            /\{issueDate\}/g,
            `<span style="font-weight: 600; color: inherit;">${issueDate}</span>`
          )
          .replace(
            /\{([^}]+)\}/g,
            `<span style="font-weight: 600; color: inherit;">$1</span>`
          )

          // Handle specific name patterns
          .replace(
            /\{Enoch Kwateh Dongbo\}/g,
            `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 2px; font-weight: 600; color: #1e40af;">${recipientName}</span>`
          )

          // Plain text replacements with styling
          .replace(
            /Sample Recipient/g,
            `<span style="border-bottom: 2px solid #1e40af; padding-bottom: 2px; font-weight: 600; color: #1e40af;">${recipientName}</span>`
          )
          .replace(
            /System Administrator/g,
            `<span style="font-weight: 600; color: inherit;">${issuerName}</span>`
          )

          // Date patterns - clean styling without underlines (for combined format)
          .replace(
            /Date: 6\/13\/2025/g,
            `Date: <span style="font-weight: 600; color: inherit;">${issueDate}</span>`
          )
          .replace(
            /6\/13\/2025/g,
            `<span style="font-weight: 600; color: inherit;">${issueDate}</span>`
          )

          // Certificate ID patterns - clean styling without underlines
          .replace(
            /FOM-\d{4}-[A-Z]{3}-\d{4}-[A-Z0-9]{2}/g,
            `<span style="font-weight: 600; color: inherit;">${this.certificate.id}</span>`
          );

        // Handle security features placeholders separately
        if (content.includes("{{qrCode}}")) {
          console.log(
            `Found {{qrCode}} placeholder in text element: ${element.id}`
          );
          // Generate QR code dynamically using the verification URL
          const verificationUrl =
            this.certificate.verificationUrl ||
            getVerificationUrl(
              this.certificate.verificationId || this.certificate.id
            );
          console.log(`Text QR verification URL: ${verificationUrl}`);
          const qrCodeDataURL = await this.generateQRCodeBase64(
            verificationUrl
          );
          console.log(
            `Text QR code generated with data URL length: ${qrCodeDataURL.length}`
          );
          content = content.replace(/\{\{qrCode\}\}/g, qrCodeDataURL);
        }

        content = content.replace(
          /\{\{verificationUrl\}\}/g,
          this.certificate.verificationUrl ||
            getVerificationUrl(
              this.certificate.verificationId || this.certificate.id
            )
        );

        content = content

          // Issuer patterns - clean styling to match date formatting (for combined format)
          .replace(
            /Authorized by: System Administrator/g,
            `Authorized by: <span style="font-weight: 600; color: inherit;">${issuerName}</span>`
          )
          .replace(
            /Issued by: System Administrator/g,
            `Issued by: <span style="font-weight: 600; color: inherit;">${issuerName}</span>`
          )
          .replace(
            /Baptized by: System Administrator/g,
            `Baptized by: <span style="font-weight: 600; color: inherit;">${issuerName}</span>`
          )

          // Clean up any remaining empty braces
          .replace(/\{\s*\}/g, "")
          .replace(/\{\{[^}]*\}\}/g, "");

        processedElements.push({
          ...element,
          content,
        });
      } else if (element.type === "image") {
        // Handle QR code placeholders in image elements
        if (element.content === "{{qrCode}}") {
          console.log(
            `Found {{qrCode}} placeholder in image element: ${element.id}`
          );
          // Generate QR code dynamically using the verification URL
          const verificationUrl =
            this.certificate.verificationUrl ||
            getVerificationUrl(
              this.certificate.verificationId || this.certificate.id
            );
          console.log(`Image QR verification URL: ${verificationUrl}`);
          const qrCodeDataURL = await this.generateQRCodeBase64(
            verificationUrl
          );
          console.log(
            `Image QR code generated with data URL length: ${qrCodeDataURL.length}`
          );
          processedElements.push({
            ...element,
            content: qrCodeDataURL,
          });
        } else {
          // Convert regular image to base64 for embedding
          const base64Content = await this.imageToBase64(element.content);
          processedElements.push({
            ...element,
            content: base64Content,
          });
        }
      } else if (element.type === "qr") {
        // Handle QR code elements - generate QR code dynamically
        console.log(`Processing QR code element: ${element.id}`);
        const verificationUrl =
          this.certificate.verificationUrl ||
          getVerificationUrl(
            this.certificate.verificationId || this.certificate.id
          );
        console.log(`QR verification URL: ${verificationUrl}`);
        const qrCodeDataURL = await this.generateQRCodeBase64(verificationUrl);
        console.log(
          `QR code element converted to image with data URL length: ${qrCodeDataURL.length}`
        );
        processedElements.push({
          ...element,
          type: "image", // Convert to image type for rendering
          content: qrCodeDataURL,
        });
      } else {
        processedElements.push(element);
      }
    }

    return processedElements;
  }

  /**
   * Smart font size adjustment that considers container dimensions
   */
  private smartFontSize(
    fontSize: string | number | undefined,
    containerWidth: number,
    containerHeight: number,
    textContent: string
  ): string {
    if (!fontSize) return "16px";

    let baseFontSize: number;

    if (typeof fontSize === "number") {
      baseFontSize = fontSize;
    } else {
      const sizeStr = fontSize.toString();

      // Parse different font size units to get pixel value
      if (sizeStr.includes("px")) {
        baseFontSize = parseFloat(sizeStr);
      } else if (sizeStr.includes("em")) {
        baseFontSize = parseFloat(sizeStr) * 16;
      } else if (sizeStr.includes("rem")) {
        baseFontSize = parseFloat(sizeStr) * 16;
      } else if (sizeStr.includes("%")) {
        baseFontSize = (parseFloat(sizeStr) / 100) * 16;
      } else {
        // Named sizes
        const namedSizes: Record<string, number> = {
          "xx-small": 10,
          "x-small": 12,
          small: 14,
          medium: 16,
          large: 20,
          "x-large": 26,
          "xx-large": 32,
          larger: 20,
          smaller: 14,
        };
        baseFontSize = namedSizes[sizeStr.toLowerCase()] || 16;
      }
    }

    // Remove HTML tags to get clean text for measurement
    const cleanText = textContent.replace(/<[^>]*>/g, "");

    // For longer content text (like descriptions), be more conservative with scaling
    const isLongContent = cleanText.length > 100; // Consider text over 100 chars as long content

    // Estimate text width (rough approximation)
    const avgCharWidth = baseFontSize * 0.6; // Approximate character width
    const estimatedTextWidth = cleanText.length * avgCharWidth;

    // Calculate estimated lines needed at current font size
    const estimatedLines = Math.ceil(
      estimatedTextWidth / (containerWidth * 0.9)
    );
    const lineHeight = baseFontSize * 1.2; // Assuming 1.2 line height
    const estimatedTextHeight = estimatedLines * lineHeight;

    // For long content, prioritize readability over fitting
    if (isLongContent) {
      // Only reduce font size if it's drastically oversized
      if (estimatedTextHeight > containerHeight * 1.5) {
        const scaleFactor = (containerHeight * 1.3) / estimatedTextHeight; // More generous scaling
        baseFontSize = baseFontSize * Math.max(scaleFactor, 0.8); // Don't scale below 80% of original
      }
      // Don't enforce horizontal constraints for long content - let it wrap naturally
    } else {
      // For shorter content (titles, names, etc), use the original logic
      if (estimatedTextWidth > containerWidth * 0.9) {
        const scaleFactor = (containerWidth * 0.9) / estimatedTextWidth;
        baseFontSize = baseFontSize * scaleFactor;
      }

      // Ensure font size isn't too large for container height
      const maxFontSizeForHeight = containerHeight * 0.8;
      if (baseFontSize > maxFontSizeForHeight) {
        baseFontSize = maxFontSizeForHeight;
      }
    }

    // Ensure minimum readable size - higher minimum for long content
    const minSize = isLongContent ? 12 : 10;
    baseFontSize = Math.max(baseFontSize, minSize);

    // Apply very modest quality enhancement, less for long content
    const enhancement = isLongContent ? 1.01 : 1.02; // 1% for long content, 2% for short
    baseFontSize = baseFontSize * enhancement;

    return `${Math.round(baseFontSize)}px`;
  }

  /**
   * Convert style object to CSS string with smart font handling
   */
  private styleToCSS(
    style: Record<string, unknown> = {},
    containerWidth?: number,
    containerHeight?: number,
    textContent?: string
  ): string {
    const cssRules: string[] = [];

    Object.entries(style).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      // Special handling for font-size with smart sizing
      if (
        key === "fontSize" &&
        containerWidth &&
        containerHeight &&
        textContent
      ) {
        const smartSize = this.smartFontSize(
          value as string,
          containerWidth,
          containerHeight,
          textContent
        );
        cssRules.push(`font-size: ${smartSize}`);
        return;
      }

      const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      cssRules.push(`${cssKey}: ${value}`);
    });

    return cssRules.join("; ");
  }

  /**
   * Generate enhanced HTML that matches the website styling exactly
   */
  private async generateHTML(): Promise<string> {
    const processedElements = await this.processElements();

    // Generate elements HTML with enhanced positioning and styling
    let elementsHtml = "";
    processedElements.forEach((element) => {
      const elementStyle = {
        position: "absolute",
        left: `${element.position.x}px`,
        top: `${element.position.y}px`,
        width: `${element.position.width}px`,
        height: `${element.position.height}px`,
        // Copy all style properties from the element
        ...element.style,
        // Ensure proper display and overflow handling
        boxSizing: "border-box",
        overflow: "visible", // Changed from "hidden" to allow natural text wrapping
        wordWrap: "break-word",
      };

      if (element.type === "text") {
        // Check if this is long content text
        const cleanText = element.content.replace(/<[^>]*>/g, "");
        const isLongContent = cleanText.length > 100;

        // Enhanced text styling to match website exactly
        const textStyle = {
          ...elementStyle,
          display: "flex",
          alignItems: isLongContent ? "flex-start" : "center", // Top align for long content
          justifyContent:
            element.style?.textAlign === "center"
              ? "center"
              : element.style?.textAlign === "right"
              ? "flex-end"
              : "flex-start",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          // Preserve all text-specific styles (font size handled separately)
          fontFamily: element.style?.fontFamily,
          fontWeight: element.style?.fontWeight,
          color: element.style?.color,
          textAlign: element.style?.textAlign,
          lineHeight: isLongContent
            ? element.style?.lineHeight || "1.4"
            : element.style?.lineHeight || "1.2", // Better line height for long content
          letterSpacing: element.style?.letterSpacing,
          textShadow: element.style?.textShadow,
          fontStyle: element.style?.fontStyle,
          // Preserve background and border styles
          backgroundColor: element.style?.backgroundColor,
          border: element.style?.border,
          borderRadius: element.style?.borderRadius,
          padding: element.style?.padding,
          margin: element.style?.margin,
          // Additional text rendering improvements
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        };

        // Use smart font sizing that considers container dimensions and content
        const smartFontSize = this.smartFontSize(
          element.style?.fontSize,
          element.position.width,
          element.position.height,
          element.content
        );

        textStyle.fontSize = smartFontSize;

        const textCss = this.styleToCSS(
          textStyle,
          element.position.width,
          element.position.height,
          element.content
        );
        elementsHtml += `<div style="${textCss}">${element.content}</div>`;
      } else if (element.type === "image") {
        // Enhanced image styling
        const imageStyle = {
          ...elementStyle,
          objectFit: "contain",
          objectPosition: "center",
          // Preserve any borders or backgrounds
          backgroundColor: element.style?.backgroundColor,
          border: element.style?.border,
          borderRadius: element.style?.borderRadius,
          padding: element.style?.padding,
          margin: element.style?.margin,
        };

        const imageCss = this.styleToCSS(imageStyle);
        elementsHtml += `<img src="${element.content}" style="${imageCss}" alt="Certificate element" crossorigin="anonymous" />`;
      } else if (element.type === "shape") {
        // Enhanced shape styling to match website exactly
        const shapeStyle = {
          ...elementStyle,
          // Ensure shape background and borders are preserved
          backgroundColor:
            element.style?.color || element.style?.backgroundColor,
          borderRadius: element.style?.borderRadius,
          border:
            element.style?.borderWidth && element.style?.borderStyle
              ? `${element.style.borderWidth} ${element.style.borderStyle} ${
                  element.style.borderColor || element.style.color || "#000"
                }`
              : element.style?.border,
          opacity: element.style?.opacity || 1,
          // Additional shape properties
          boxShadow: element.style?.boxShadow,
          transform: element.style?.transform,
        };

        const shapeCss = this.styleToCSS(shapeStyle);
        elementsHtml += `<div style="${shapeCss}"></div>`;
      } else if (element.type === "qr") {
        // QR code fallback (QR elements should be converted to images in processElements)
        console.warn(
          "QR element not converted to image - this shouldn't happen"
        );
        const qrStyle = {
          ...elementStyle,
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          color: "#666",
        };

        const qrCss = this.styleToCSS(qrStyle);
        elementsHtml += `<div style="${qrCss}">QR Code Unavailable</div>`;
      }
    });

    // Enhanced HTML with better CSS and exact website styling
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Certificate - ${this.certificate.id}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Times+New+Roman:wght@400;600;700&family=Arial:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&family=Roboto:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap');
          
          * { 
            box-sizing: border-box; 
            margin: 0; 
            padding: 0; 
          }
          
          body { 
            margin: 0; 
            padding: 0; 
            font-family: 'Times New Roman', serif; 
            background: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            font-display: swap;
            text-rendering: optimizeLegibility;
          }
          
          /* Enhanced text rendering for better content display */
          .certificate-container div {
            hyphens: auto;
            -webkit-hyphens: auto;
            -ms-hyphens: auto;
          }
          
          /* Better handling for long text content */
          .certificate-container div:not(img) {
            overflow-wrap: break-word;
            word-break: break-word;
            text-overflow: clip;
          }
          
          .certificate-container { 
            position: relative; 
            width: ${this.pageSettings.width}px; 
            height: ${this.pageSettings.height}px; 
            background: ${this.pageSettings.background?.color || "#ffffff"};
            ${
              this.pageSettings.background?.border
                ? `border: ${this.pageSettings.background.border};`
                : ""
            }
            ${
              this.pageSettings.background?.borderColor
                ? `border-color: ${this.pageSettings.background.borderColor};`
                : ""
            }
            ${
              this.pageSettings.background?.borderWidth
                ? `border-width: ${this.pageSettings.background.borderWidth}px;`
                : ""
            }
            margin: 0;
            overflow: hidden;
            box-shadow: none;
            transform: scale(1);
            transform-origin: center;
            font-display: swap;
            text-rendering: optimizeLegibility;
          }
          
          .certificate-container * {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Enhanced text rendering for all text elements */
          .certificate-container div {
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-display: swap;
            /* Ensure text stays within bounds */
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            hyphens: auto;
          }
          
          /* Prevent text from wrapping when it shouldn't */
          .certificate-container div[style*="white-space: nowrap"] {
            white-space: nowrap !important;
          }
          
          /* Handle long text gracefully */
          .certificate-container div[style*="font-size"] {
            line-height: 1.1;
            letter-spacing: -0.02em;
          }
          
          img {
            max-width: 100%;
            height: auto;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
          
          /* Ensure all fonts are loaded */
          .certificate-container div,
          .certificate-container span {
            font-display: swap;
          }
          
          @media print {
            body { 
              padding: 0; 
              background: white;
              display: block;
              min-height: auto;
            }
            .certificate-container {
              box-shadow: none;
              margin: 0;
              page-break-inside: avoid;
              transform: none;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          }
          
          @page {
            size: ${this.pageSettings.width}px ${this.pageSettings.height}px;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="certificate-container">
          ${elementsHtml}
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generate PDF using hybrid approach
   */
  async generatePDF(): Promise<Buffer> {
    const html = await this.generateHTML();

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
        "--allow-running-insecure-content",
        "--force-color-profile=srgb",
        "--enable-font-antialiasing",
        "--disable-lcd-text",
      ],
    });

    try {
      const page = await browser.newPage();

      // Set high-resolution viewport for better quality
      await page.setViewport({
        width: this.pageSettings.width + 100,
        height: this.pageSettings.height + 100,
        deviceScaleFactor: 2.5, // Increased DPI for better font rendering
      });

      // Set content and wait for all resources to load
      await page.setContent(html, {
        waitUntil: ["networkidle0", "domcontentloaded"],
      });

      // Ensure fonts are fully loaded
      await page.evaluateOnNewDocument(() => {
        if ("fonts" in document) {
          (
            document as unknown as { fonts: { ready: Promise<unknown> } }
          ).fonts.ready.then(() => {
            console.log("All fonts loaded");
          });
        }
      });

      // Wait for images to load
      await page.evaluate(() => {
        return Promise.all(
          Array.from(document.images, (img) => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
              img.addEventListener("load", resolve);
              img.addEventListener("error", resolve); // Continue even if image fails
              setTimeout(resolve, 2000); // Timeout after 2 seconds
            });
          })
        );
      });

      // Wait for fonts to load and render
      await page.evaluate(() => {
        if ("fonts" in document) {
          return (document as unknown as { fonts: { ready: Promise<unknown> } })
            .fonts.ready;
        }
        return Promise.resolve();
      });

      // Add extra delay to ensure fonts and styles are fully loaded
      await page.evaluate(
        () => new Promise((resolve) => setTimeout(resolve, 4000))
      );

      // Generate PDF with precise dimensions and color preservation
      const pdfBuffer = await page.pdf({
        width: `${this.pageSettings.width}px`,
        height: `${this.pageSettings.height}px`,
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        preferCSSPageSize: true,
        format: undefined, // Use custom width/height
        displayHeaderFooter: false,
        tagged: false,
        outline: false,
      });

      return Buffer.from(pdfBuffer);
    } finally {
      await browser.close();
    }
  }

  /**
   * Generate PNG using hybrid approach
   */
  async generatePNG(): Promise<Buffer> {
    const html = await this.generateHTML();

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
        "--allow-running-insecure-content",
        "--force-color-profile=srgb",
        "--enable-font-antialiasing",
        "--disable-lcd-text",
      ],
    });

    try {
      const page = await browser.newPage();

      // Set very high-resolution viewport for crisp PNG rendering
      await page.setViewport({
        width: this.pageSettings.width + 100,
        height: this.pageSettings.height + 100,
        deviceScaleFactor: 3.5, // Very high DPI for PNG with better font rendering
      });

      // Set content and wait for all resources to load
      await page.setContent(html, {
        waitUntil: ["networkidle0", "domcontentloaded"],
      });

      // Ensure fonts are fully loaded
      await page.evaluateOnNewDocument(() => {
        if ("fonts" in document) {
          (
            document as unknown as { fonts: { ready: Promise<unknown> } }
          ).fonts.ready.then(() => {
            console.log("All fonts loaded");
          });
        }
      });

      // Wait for images to load
      await page.evaluate(() => {
        return Promise.all(
          Array.from(document.images, (img) => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
              img.addEventListener("load", resolve);
              img.addEventListener("error", resolve); // Continue even if image fails
              setTimeout(resolve, 2000); // Timeout after 2 seconds
            });
          })
        );
      });

      // Wait for fonts to load and render
      await page.evaluate(() => {
        if ("fonts" in document) {
          return (document as unknown as { fonts: { ready: Promise<unknown> } })
            .fonts.ready;
        }
        return Promise.resolve();
      });

      // Add extra delay to ensure fonts and styles are fully loaded
      await page.evaluate(
        () => new Promise((resolve) => setTimeout(resolve, 4000))
      );

      // Take high-quality screenshot of the certificate container
      const element = await page.$(".certificate-container");
      if (!element) {
        throw new Error("Certificate container not found");
      }

      const screenshot = await element.screenshot({
        type: "png",
        omitBackground: false,
        captureBeyondViewport: false,
        optimizeForSpeed: false,
        clip: undefined, // Use element's natural bounds
      });

      return screenshot as Buffer;
    } finally {
      await browser.close();
    }
  }

  /**
   * Generate HTML content for preview (same as used for PDF/PNG generation)
   */
  async generateHTMLPreview(): Promise<string> {
    return await this.generateHTML();
  }
}
