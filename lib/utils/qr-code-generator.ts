/**
 * QR Code Generator Utility
 * Centralized QR code generation with enhanced scannability
 */

import QRCode from "qrcode";

export interface QRCodeOptions {
  /**
   * Error correction level
   * L: ~7%, M: ~15%, Q: ~25%, H: ~30%
   */
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";

  /**
   * Size of the QR code
   */
  size?: "small" | "medium" | "large" | "xlarge";

  /**
   * Margin around QR code (quiet zone)
   */
  margin?: number;

  /**
   * Colors for the QR code
   */
  colors?: {
    dark?: string;
    light?: string;
  };

  /**
   * Custom width override (pixels)
   */
  width?: number;
  /**
   * Custom scale override (controls individual marker/module size)
   * Higher scale = larger black/white squares = easier scanning from distance
   * Recommended: 24+ for certificates, 48+ for distance scanning
   */
  scale?: number;
}

/**
 * Size presets for different use cases with enhanced marker visibility
 * Scale determines the size of individual QR code markers/modules
 */
const SIZE_PRESETS = {
  small: { scale: 16, width: 200 }, // Doubled from 8 to 16
  medium: { scale: 24, width: 300 }, // Doubled from 12 to 24
  large: { scale: 32, width: 450 }, // Doubled from 16 to 32
  xlarge: { scale: 40, width: 600 }, // Doubled from 20 to 40
} as const;

/**
 * Generate QR code as base64 data URL with enhanced scannability
 *
 * @param data - The data to encode in the QR code (URL, JSON, text)
 * @param options - Configuration options for QR code generation
 * @returns Promise<string> - Base64 data URL of the QR code
 */
export async function generateQRCode(
  data: string,
  options: QRCodeOptions = {}
): Promise<string> {
  try {
    console.log("🔍 QR Code generation started:", {
      dataLength: data.length,
      dataPreview: data.substring(0, 100) + (data.length > 100 ? "..." : ""),
      options,
    });

    // Apply size preset or custom settings
    const sizeConfig = options.size
      ? SIZE_PRESETS[options.size]
      : SIZE_PRESETS.large;

    const qrCodeDataUrl = await QRCode.toDataURL(data, {
      // High error correction for maximum reliability and scanning success
      errorCorrectionLevel: options.errorCorrectionLevel || "H",

      // Image format
      type: "image/png", // Margin (quiet zone) - MINIMAL for certificates to maximize visual size
      margin: options.margin ?? 1,

      // Scale and size for ultra-clear scanning
      scale: options.scale ?? sizeConfig.scale,
      width: options.width ?? sizeConfig.width,

      // High contrast colors for maximum scannability
      color: {
        dark: options.colors?.dark || "#000000", // Pure black
        light: options.colors?.light || "#ffffff", // Pure white
      },
    });

    console.log("✅ QR Code generated successfully:", {
      dataLength: qrCodeDataUrl.length,
      finalSize: `${options.width ?? sizeConfig.width}px`,
      errorCorrection: options.errorCorrectionLevel || "H",
    });

    return qrCodeDataUrl;
  } catch (error) {
    console.error("❌ QR Code generation failed:", error);

    // Return a placeholder image on failure
    return generatePlaceholderQRCode();
  }
}

/**
 * Generate a placeholder QR code image for fallback cases
 */
function generatePlaceholderQRCode(): string {
  // A simple 1x1 transparent pixel as fallback
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
}

/**
 * Quick QR code generation with default settings for certificates
 * Uses extra large markers for maximum scannability from distance
 * NO MARGIN for maximum visual size and completely eliminated white edge
 *
 * @param data - The data to encode
 * @returns Promise<string> - Base64 data URL optimized for certificates
 */
export async function generateCertificateQRCode(data: string): Promise<string> {
  return generateQRCode(data, {
    size: "xlarge", // Use xlarge for certificates
    scale: 48, // Extra large markers for distance scanning
    width: 500, // Larger overall size
    errorCorrectionLevel: "H",
    margin: 1, // MINIMAL margin for optimal balance (was 0)
  });
}

/**
 * Generate QR code optimized for URLs (shorter data)
 * MINIMIZED MARGIN for maximum visual size and reduced white edge
 *
 * @param url - The URL to encode
 * @returns Promise<string> - Base64 data URL optimized for URLs
 */
export async function generateURLQRCode(url: string): Promise<string> {
  return generateQRCode(url, {
    size: "medium",
    errorCorrectionLevel: "M", // Medium is sufficient for URLs
    margin: 1, // MINIMAL margin to eliminate white edge (was 3)
  });
}

/**
 * Generate QR code optimized for complex data (JSON, large text)
 * Uses extra large markers for better scanning of complex data
 * MINIMIZED MARGIN for maximum visual size and reduced white edge
 *
 * @param data - The complex data to encode
 * @returns Promise<string> - Base64 data URL optimized for complex data
 */
export async function generateDataQRCode(data: string): Promise<string> {
  return generateQRCode(data, {
    size: "xlarge",
    scale: 44, // Large markers for complex data
    width: 550, // Larger size for complex data
    errorCorrectionLevel: "H", // High error correction for complex data
    margin: 1, // MINIMAL margin to eliminate white edge (was 5)
  });
}

/**
 * Validate QR code data before generation
 *
 * @param data - The data to validate
 * @returns boolean - Whether the data is valid for QR code generation
 */
export function validateQRCodeData(data: string): boolean {
  if (!data || typeof data !== "string") {
    return false;
  }

  // QR codes can handle up to ~4,296 characters (alphanumeric mode)
  // But practically, keep it under 2,000 for better scanning
  if (data.length > 2000) {
    console.warn(
      "QR code data is very long and may be difficult to scan:",
      data.length
    );
    return false;
  }

  return true;
}

/**
 * Get optimal QR code settings based on data type and length
 * Uses MINIMAL MARGINS for maximum visual size and reduced white edge
 *
 * @param data - The data to analyze
 * @returns QRCodeOptions - Recommended options for the data
 */
export function getOptimalQRCodeSettings(data: string): QRCodeOptions {
  const length = data.length;

  if (length <= 100) {
    // Short data (URLs, IDs) - medium size is sufficient
    return {
      size: "medium",
      errorCorrectionLevel: "M",
      margin: 1, // MINIMAL margin (was 3)
    };
  } else if (length <= 500) {
    // Medium data - large size with high error correction
    return {
      size: "large",
      errorCorrectionLevel: "H",
      margin: 1, // MINIMAL margin (was 4)
    };
  } else {
    // Long data (JSON, complex text) - extra large with maximum error correction
    return {
      size: "xlarge",
      errorCorrectionLevel: "H",
      margin: 1, // MINIMAL margin (was 4)
    };
  }
}

/**
 * Generate ultra-scannable QR code with maximum marker size for distance scanning
 * Perfect for certificates that need to be scanned from far away with extra large data markers
 * MINIMAL MARGIN for optimal balance of visual size and scannability
 *
 * @param data - The data to encode
 * @returns Promise<string> - Base64 data URL with maximum scannability
 */
export async function generateUltraScanQRCode(data: string): Promise<string> {
  return generateQRCode(data, {
    scale: 100, // MAXIMUM size markers for ultra-distance scanning (was 60)
    width: 600, // Large overall size
    errorCorrectionLevel: "H", // Maximum error correction
    margin: 1, // MINIMAL margin for optimal balance (was 0)
    colors: {
      dark: "#000000", // Pure black for maximum contrast
      light: "#ffffff", // Pure white background
    },
  });
}

/**
 * Generate PDF-optimized QR code with extra large markers for certificate scannability
 * Optimized for PDF generation with much larger data markers for downloadable certificates
 * NO MARGIN for maximum visual size and completely eliminated white edge
 *
 * @param data - The data to encode
 * @returns Promise<string> - Base64 data URL optimized for PDF with large scannable markers
 */
export async function generatePDFOptimizedQRCode(
  data: string
): Promise<string> {
  return generateQRCode(data, {
    scale: 80, // EXTRA LARGE markers for certificate PDF scannability (was 36)
    width: 400, // Keep reasonable overall size for PDF documents
    errorCorrectionLevel: "H", // Maximum error correction
    margin: 1, // MINIMAL margin for optimal balance (was 0)
    colors: {
      dark: "#000000", // Pure black for maximum contrast
      light: "#ffffff", // Pure white background
    },
  });
}

/**
 * Generate localhost-optimized QR code with MAXIMUM possible scale for certificate downloads
 * Uses the highest possible scale settings to ensure large modules for complex JSON data
 * Specifically designed for localhost certificate downloads where data is complex but scannability is critical
 * NO MARGIN for maximum visual size and completely eliminated white edge
 *
 * @param data - The data to encode (usually JSON for localhost certificates)
 * @returns Promise<string> - Base64 data URL with maximum possible module size
 */
export async function generateLocalhostMaxScaleQRCode(
  data: string
): Promise<string> {
  return generateQRCode(data, {
    scale: 120, // MAXIMUM SCALE for ultra-large modules (was 80)
    width: 600, // Larger overall size to accommodate high scale
    errorCorrectionLevel: "H", // Maximum error correction for complex data
    margin: 1, // MINIMAL margin for optimal balance (was 0)
    colors: {
      dark: "#000000", // Pure black for maximum contrast
      light: "#ffffff", // Pure white background
    },
  });
}

/**
 * Generate production-optimized QR code for simple URL data
 * Uses moderate scale since URL data has fewer modules
 * MINIMIZED MARGIN for maximum visual size and reduced white edge
 *
 * @param data - The data to encode (usually a simple URL)
 * @returns Promise<string> - Base64 data URL optimized for URL data
 */
export async function generateProductionQRCode(data: string): Promise<string> {
  return generateQRCode(data, {
    scale: 48, // Good scale for URL data
    width: 400, // Standard size
    errorCorrectionLevel: "M", // Medium error correction sufficient for URLs
    margin: 1, // MINIMAL margin to eliminate white edge (was 4)
    colors: {
      dark: "#000000", // Pure black for maximum contrast
      light: "#ffffff", // Pure white background
    },
  });
}

/**
 * Smart QR code generation that detects data type and uses optimal settings
 * Automatically chooses between localhost (JSON) and production (URL) optimizations
 *
 * @param data - The data to encode
 * @param format - Output format for additional optimization
 * @returns Promise<string> - Base64 data URL with optimal settings for the data type
 */
export async function generateSmartQRCode(
  data: string,
  format: "pdf" | "png" | "preview" = "preview"
): Promise<string> {
  // Detect if this is localhost JSON data or production URL
  const isLocalhostJSON =
    data.includes('"t": "CERT"') || // New compact format
    data.includes('"type": "CERTIFICATE_INFO"') || // Old format
    data.includes('"environment": "development"') ||
    data.includes('"env": "dev"') || // New compact format
    (data.startsWith("{") && data.includes("certificateId")) ||
    (data.startsWith("{") && data.includes('"id":')); // Compact format

  const isURL = data.startsWith("http://") || data.startsWith("https://");

  console.log("🔍 Smart QR Code Detection:", {
    dataLength: data.length,
    isLocalhostJSON,
    isURL,
    format,
    dataPreview: data.substring(0, 100) + (data.length > 100 ? "..." : ""),
  });

  if (isLocalhostJSON) {
    // Use maximum scale for localhost JSON data to ensure large modules
    console.log("📱 Using LOCALHOST MAX SCALE for JSON certificate data");
    return generateLocalhostMaxScaleQRCode(data);
  } else if (isURL) {
    // Use production optimized for URLs
    console.log("🌐 Using PRODUCTION optimization for URL data");
    return generateProductionQRCode(data);
  } else {
    // Fallback to format-specific generation
    console.log("🔄 Using format-specific fallback");
    if (format === "pdf") {
      return generatePDFOptimizedQRCode(data);
    } else {
      return generateUltraScanQRCode(data);
    }
  }
}
