"use client";

import { useRef, useState, type ReactNode } from "react";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BG_DARK,
  FLYER_PORTRAIT_H,
  FLYER_PORTRAIT_W,
  GOLD,
} from "@/components/jicf/ekddigital-flyer-theme";

type EKDDigitalFlyerShellProps = {
  children: ReactNode;
  downloadFilename: string;
  /** PNG export background — defaults to EKD Digital warm dark */
  exportBackgroundColor?: string;
};

export function EKDDigitalFlyerShell({
  children,
  downloadFilename,
  exportBackgroundColor = BG_DARK,
}: EKDDigitalFlyerShellProps) {
  const flyerRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const downloadPng = async () => {
    if (!flyerRef.current || downloading) return;
    setDownloading(true);
    try {
      const { toPng } = await import("html-to-image");
      const el = flyerRef.current;

      if ("fonts" in document) {
        await (document as Document & { fonts: { ready: Promise<unknown> } })
          .fonts.ready;
      }

      const dataUrl = await toPng(el, {
        cacheBust: true,
        pixelRatio: 2,
        width: FLYER_PORTRAIT_W,
        height: FLYER_PORTRAIT_H,
        canvasWidth: FLYER_PORTRAIT_W * 2,
        canvasHeight: FLYER_PORTRAIT_H * 2,
        backgroundColor: exportBackgroundColor,
      });

      const link = document.createElement("a");
      link.download = downloadFilename;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4">
      <FlyerShellControls
        downloading={downloading}
        onDownload={() => void downloadPng()}
      />

      <div
        className="shadow-2xl print:shadow-none"
        style={{
          width: "100%",
          maxWidth: FLYER_PORTRAIT_W,
          aspectRatio: `${FLYER_PORTRAIT_W} / ${FLYER_PORTRAIT_H}`,
          overflow: "hidden",
          borderRadius: 16,
          border: "1px solid rgba(200,160,97,0.25)",
        }}
      >
        <div
          ref={flyerRef}
          style={{
            width: FLYER_PORTRAIT_W,
            height: FLYER_PORTRAIT_H,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center print:hidden">
        Preview is {FLYER_PORTRAIT_W} × {FLYER_PORTRAIT_H} px · Download exports at{" "}
        {FLYER_PORTRAIT_W * 2} × {FLYER_PORTRAIT_H * 2} px (portrait)
      </p>
    </div>
  );
}

function FlyerShellControls({
  downloading,
  onDownload,
}: {
  downloading: boolean;
  onDownload: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <Button
        onClick={onDownload}
        disabled={downloading}
        style={{ background: GOLD, color: BG_DARK }}
        className="hover:opacity-90 font-bold"
      >
        <Download className="size-4 mr-2" />
        {downloading ? "Preparing…" : "Download PNG (1080 × 1800)"}
      </Button>
      <Button
        variant="outline"
        onClick={() => window.print()}
        style={{ borderColor: GOLD, color: GOLD }}
        className="hover:bg-[#C8A061]/10"
      >
        <Printer className="size-4 mr-2" />
        Print / Save PDF
      </Button>
    </div>
  );
}
