"use client";

import { useMemo, useRef, useState } from "react";
import { Download, Printer, RotateCcw } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  JicfWeddingCertificateDocument,
  jicfWeddingCertificateStyles,
} from "@/components/jicf/jicf-wedding-certificate-document";
import {
  JICF_WEDDING_BLANK,
  JICF_WEDDING_COLORS,
  JICF_WEDDING_HARMON_BARVOR,
  type JicfWeddingCertificateData,
} from "@/lib/jicf/wedding-certificate-data";

type FieldKey = keyof JicfWeddingCertificateData;

const TEXT_FIELDS: Array<{
  key: FieldKey;
  label: string;
  placeholder?: string;
  wide?: boolean;
}> = [
  { key: "organizationName", label: "Organization", wide: true },
  { key: "title", label: "Title" },
  { key: "subtitle", label: "Subtitle" },
  { key: "ceremonyDay", label: "Day", placeholder: "26th" },
  { key: "ceremonyMonth", label: "Month", placeholder: "September" },
  { key: "ceremonyYear", label: "Year", placeholder: "2026" },
  { key: "churchAddress", label: "Church address", wide: true },
  { key: "location", label: "Ceremony place", placeholder: "Hangzhou, China" },
  { key: "brideName", label: "Bride" },
  { key: "groomName", label: "Groom" },
  { key: "officiantName", label: "Officiant" },
  { key: "witness1Name", label: "Witness 1 name (optional)" },
  { key: "witness2Name", label: "Witness 2 name (optional)" },
  { key: "certificateId", label: "Certificate ID" },
];

function slugFileBase(bride: string, groom: string): string {
  const parts = [bride, groom]
    .map((name) =>
      name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    )
    .filter(Boolean);
  return parts.length
    ? `jicf-wedding-certificate-${parts.join("-and-")}`
    : "jicf-wedding-certificate";
}

export function JicfWeddingCertificateShell({
  initialData = JICF_WEDDING_HARMON_BARVOR,
}: {
  initialData?: JicfWeddingCertificateData;
}) {
  const [data, setData] = useState<JicfWeddingCertificateData>(initialData);
  const [isExporting, setIsExporting] = useState(false);
  const certificateRef = useRef<HTMLDivElement | null>(null);

  const fileBase = useMemo(
    () => slugFileBase(data.brideName, data.groomName),
    [data.brideName, data.groomName],
  );

  const patch = (key: FieldKey, value: string) => {
    setData((current) => ({ ...current, [key]: value }));
  };

  const captureCertificateDataUrl = async (): Promise<string> => {
    const source = certificateRef.current;
    if (!source) throw new Error("Certificate element not ready");

    const bounds = source.getBoundingClientRect();
    const width = Math.max(1, Math.round(bounds.width));
    const height = Math.max(1, Math.round(bounds.height));

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.left = "0";
    wrapper.style.top = "0";
    wrapper.style.width = `${width}px`;
    wrapper.style.height = `${height}px`;
    wrapper.style.overflow = "hidden";
    wrapper.style.opacity = "0";
    wrapper.style.pointerEvents = "none";
    wrapper.style.background = JICF_WEDDING_COLORS.ivory;

    const clone = source.cloneNode(true) as HTMLElement;
    clone.style.margin = "0";
    clone.style.width = `${width}px`;
    clone.style.maxWidth = `${width}px`;
    clone.style.height = `${height}px`;
    clone.style.transform = "none";
    clone.style.boxShadow = "none";
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    try {
      const images = clone.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise<void>((resolve) => {
              if ((img as HTMLImageElement).complete) {
                resolve();
                return;
              }
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            }),
        ),
      );

      return await toPng(clone, {
        backgroundColor: JICF_WEDDING_COLORS.ivory,
        pixelRatio: 2,
        cacheBust: true,
        width,
        height,
        canvasWidth: width,
        canvasHeight: height,
        skipFonts: true,
      });
    } finally {
      wrapper.remove();
    }
  };

  const downloadAsPng = async () => {
    if (!certificateRef.current || isExporting) return;
    setIsExporting(true);
    try {
      const dataUrl = await captureCertificateDataUrl();
      const link = document.createElement("a");
      link.download = `${fileBase}.png`;
      link.href = dataUrl;
      document.body.append(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download PNG wedding certificate", error);
      window.alert("Unable to download PNG right now. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const downloadAsPdf = async () => {
    if (!certificateRef.current || isExporting) return;
    setIsExporting(true);
    try {
      const dataUrl = await captureCertificateDataUrl();
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const image = pdf.getImageProperties(dataUrl);
      const scale = Math.min(
        pageWidth / image.width,
        pageHeight / image.height,
      );
      const renderWidth = image.width * scale;
      const renderHeight = image.height * scale;
      pdf.addImage(
        dataUrl,
        "PNG",
        (pageWidth - renderWidth) / 2,
        (pageHeight - renderHeight) / 2,
        renderWidth,
        renderHeight,
      );
      pdf.save(`${fileBase}.pdf`);
    } catch (error) {
      console.error("Failed to download PDF wedding certificate", error);
      window.alert("Unable to download PDF right now. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <style>{`
        ${jicfWeddingCertificateStyles}
        @media screen {
          .jicf-wedding-print-area { overflow-x: auto; padding: 0.5rem 0 1.5rem; }
        }
        @media print {
          .jicf-wedding-no-print, header, footer, nav { display: none !important; }
          body { background: white !important; }
          .jicf-wedding-print-area { margin: 0 !important; padding: 0 !important; overflow: visible !important; }
          .jicf-wedding-page { box-shadow: none !important; }
          @page { size: A4 landscape; margin: 0; }
        }
      `}</style>

      <Card className="jicf-wedding-no-print">
        <CardHeader>
          <CardTitle style={{ color: JICF_WEDDING_COLORS.navy }}>
            JICF Wedding Certificate
          </CardTitle>
          <CardDescription>
            Landscape marriage record for Jinan International Christian
            Fellowship. Edit the fields, then print or download. Witness lines
            stay blank until a name is entered.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {TEXT_FIELDS.map((field) => (
              <div
                key={field.key}
                className={`space-y-2 ${field.wide ? "md:col-span-2 xl:col-span-3" : ""}`}
              >
                <Label htmlFor={`jicf-wed-${field.key}`}>{field.label}</Label>
                <Input
                  id={`jicf-wed-${field.key}`}
                  value={data[field.key]}
                  placeholder={field.placeholder}
                  onChange={(event) => patch(field.key, event.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="jicf-wed-covenant">Covenant paragraph</Label>
            <Textarea
              id="jicf-wed-covenant"
              rows={4}
              value={data.covenantText}
              onChange={(event) => patch("covenantText", event.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => window.print()}
              disabled={isExporting}
              style={{
                backgroundColor: JICF_WEDDING_COLORS.navy,
                color: JICF_WEDDING_COLORS.white,
              }}
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" onClick={downloadAsPng} disabled={isExporting}>
              <Download className="h-4 w-4" />
              {isExporting ? "Preparing..." : "Download PNG"}
            </Button>
            <Button variant="outline" onClick={downloadAsPdf} disabled={isExporting}>
              <Download className="h-4 w-4" />
              {isExporting ? "Preparing..." : "Download PDF"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setData(JICF_WEDDING_HARMON_BARVOR)}
              disabled={isExporting}
            >
              Harmon–Barvor record
            </Button>
            <Button
              variant="ghost"
              onClick={() => setData(JICF_WEDDING_BLANK)}
              disabled={isExporting}
            >
              <RotateCcw className="h-4 w-4" />
              Blank
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="jicf-wedding-print-area">
        <div ref={certificateRef} className="mx-auto w-fit">
          <JicfWeddingCertificateDocument data={data} />
        </div>
      </div>
    </div>
  );
}
