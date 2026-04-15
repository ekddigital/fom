import { sanitizeFilename } from "./download-blob";

type PdfExportOptions = {
  containerId: string;
  filename: string;
  scale?: number;
};

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

const COLOR_SAFETY_CSS = `
:root {
  --background: #ffffff !important;
  --foreground: #0f172a !important;
  --card: #ffffff !important;
  --card-foreground: #0f172a !important;
  --popover: #ffffff !important;
  --popover-foreground: #0f172a !important;
  --primary: #0c436a !important;
  --primary-foreground: #ffffff !important;
  --secondary: #f1f5f9 !important;
  --secondary-foreground: #0f172a !important;
  --muted: #f1f5f9 !important;
  --muted-foreground: #64748b !important;
  --accent: #e2e8f0 !important;
  --accent-foreground: #0f172a !important;
  --border: #cbd5e1 !important;
  --input: #cbd5e1 !important;
  --ring: #94a3b8 !important;
  --color-slate-50: #f8fafc !important;
  --color-slate-100: #f1f5f9 !important;
  --color-slate-200: #e2e8f0 !important;
  --color-slate-300: #cbd5e1 !important;
  --color-slate-400: #94a3b8 !important;
  --color-slate-500: #64748b !important;
  --color-slate-600: #475569 !important;
  --color-slate-700: #334155 !important;
  --color-slate-800: #1e293b !important;
  --color-slate-900: #0f172a !important;
}
`;

const COLOR_FUNCTION_PATTERN = /(?:oklch|oklab|lch|lab|color\()/i;

type ColorStyleProperty =
  | "color"
  | "backgroundColor"
  | "borderTopColor"
  | "borderRightColor"
  | "borderBottomColor"
  | "borderLeftColor"
  | "outlineColor"
  | "textDecorationColor";

const COLOR_PROPERTIES: Array<{
  key: ColorStyleProperty;
  fallback: string;
}> = [
  { key: "color", fallback: "#0f172a" },
  { key: "backgroundColor", fallback: "transparent" },
  { key: "borderTopColor", fallback: "#cbd5e1" },
  { key: "borderRightColor", fallback: "#cbd5e1" },
  { key: "borderBottomColor", fallback: "#cbd5e1" },
  { key: "borderLeftColor", fallback: "#cbd5e1" },
  { key: "outlineColor", fallback: "#cbd5e1" },
  { key: "textDecorationColor", fallback: "#0f172a" },
];

function hasUnsupportedColorFunction(value: string): boolean {
  return COLOR_FUNCTION_PATTERN.test(value);
}

function createColorNormalizer() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  return (value: string, fallback: string): string => {
    if (!value || value === "transparent") {
      return value;
    }

    if (!hasUnsupportedColorFunction(value)) {
      return value;
    }

    if (!context) {
      return fallback;
    }

    try {
      context.fillStyle = "#000000";
      context.fillStyle = value;
      const normalized = context.fillStyle;

      if (normalized && !hasUnsupportedColorFunction(normalized)) {
        return normalized;
      }
    } catch {
      return fallback;
    }

    return fallback;
  };
}

function sanitizeCloneForHtml2Canvas(
  clonedDocument: Document,
  containerId: string,
): void {
  const clonedContainer = clonedDocument.getElementById(containerId);

  if (!clonedContainer) {
    return;
  }

  const safetyStyle = clonedDocument.createElement("style");
  safetyStyle.setAttribute("data-fom-pdf-color-safety", "true");
  safetyStyle.textContent = COLOR_SAFETY_CSS;
  clonedDocument.head.appendChild(safetyStyle);

  const htmlElement = clonedDocument.documentElement;
  const bodyElement = clonedDocument.body;

  htmlElement.style.backgroundColor = "#ffffff";
  htmlElement.style.color = "#0f172a";
  bodyElement.style.backgroundColor = "#ffffff";
  bodyElement.style.color = "#0f172a";

  const normalizeColor = createColorNormalizer();

  const nodes = [
    clonedContainer as HTMLElement,
    ...Array.from(clonedContainer.querySelectorAll<HTMLElement>("*")),
  ];

  for (const node of nodes) {
    const computedStyles = clonedDocument.defaultView?.getComputedStyle(node);

    if (!computedStyles) {
      continue;
    }

    for (const property of COLOR_PROPERTIES) {
      const value = computedStyles[property.key];
      const safeColor = normalizeColor(value, property.fallback);

      if (safeColor) {
        node.style[property.key] = safeColor;
      }
    }

    if (
      computedStyles.backgroundImage &&
      computedStyles.backgroundImage !== "none"
    ) {
      node.style.backgroundImage = "none";
    }

    if (computedStyles.boxShadow && computedStyles.boxShadow !== "none") {
      node.style.boxShadow = "none";
    }

    if (computedStyles.textShadow && computedStyles.textShadow !== "none") {
      node.style.textShadow = "none";
    }
  }
}

async function waitForAssets(root: HTMLElement): Promise<void> {
  const imageElements = Array.from(
    root.querySelectorAll<HTMLImageElement>("img"),
  );

  await Promise.all(
    imageElements.map(
      (image) =>
        new Promise<void>((resolve) => {
          if (image.complete) {
            resolve();
            return;
          }

          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  );

  if (typeof document !== "undefined" && "fonts" in document) {
    await document.fonts.ready;
  }
}

function nextAnimationFrame(): Promise<void> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });
}

export async function exportA4ContainerToPdf({
  containerId,
  filename,
  scale = 2,
}: PdfExportOptions): Promise<void> {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Export container not found: #${containerId}`);
  }

  const pages = container.querySelectorAll<HTMLElement>(".a4-page");
  if (pages.length === 0) {
    throw new Error("No A4 pages found for PDF export.");
  }

  const html2canvas = (await import("html2canvas")).default;
  const { jsPDF } = await import("jspdf");

  const previousInlineStyles = {
    position: container.style.position,
    top: container.style.top,
    left: container.style.left,
    opacity: container.style.opacity,
    zIndex: container.style.zIndex,
    pointerEvents: container.style.pointerEvents,
  };

  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.opacity = "0";
  container.style.zIndex = "-1";
  container.style.pointerEvents = "none";

  try {
    await waitForAssets(container);
    await nextAnimationFrame();

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    for (let index = 0; index < pages.length; index += 1) {
      const page = pages[index];

      const canvas = await html2canvas(page, {
        scale: Math.max(1, scale),
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: page.scrollWidth || page.offsetWidth,
        windowHeight: page.scrollHeight || page.offsetHeight,
        onclone: (clonedDocument) => {
          sanitizeCloneForHtml2Canvas(clonedDocument, containerId);
        },
      });

      const imageData = canvas.toDataURL("image/jpeg", 0.95);

      if (index > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        imageData,
        "JPEG",
        0,
        0,
        A4_WIDTH_MM,
        A4_HEIGHT_MM,
        undefined,
        "FAST",
      );
    }

    pdf.save(`${sanitizeFilename(filename)}.pdf`);
  } finally {
    container.style.position = previousInlineStyles.position;
    container.style.top = previousInlineStyles.top;
    container.style.left = previousInlineStyles.left;
    container.style.opacity = previousInlineStyles.opacity;
    container.style.zIndex = previousInlineStyles.zIndex;
    container.style.pointerEvents = previousInlineStyles.pointerEvents;
  }
}
