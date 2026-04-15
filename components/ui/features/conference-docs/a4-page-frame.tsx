"use client";

import { type ReactNode } from "react";
import { FOM_BRAND } from "@/lib/constants/fom";

type A4PageFrameProps = {
  pageNumber: number;
  totalPages: number;
  footerNote: string;
  showCovenantHeader?: boolean;
  marginPreset?: "default" | "word";
  children: ReactNode;
};

export function A4PageFrame({
  pageNumber,
  totalPages,
  footerNote,
  showCovenantHeader = false,
  marginPreset = "default",
  children,
}: A4PageFrameProps) {
  return (
    <section
      className={`a4-page${marginPreset === "word" ? " a4-page--word" : ""}`}
    >
      {showCovenantHeader ? (
        <header className="a4-page-header">
          <span className="a4-page-header-scripture">
            &quot;{FOM_BRAND.covenantText}&quot; - {FOM_BRAND.covenantVerse}
          </span>
        </header>
      ) : null}
      <div className="a4-page-body">{children}</div>
      <footer className="a4-page-footer">
        <span className="a4-page-footer-note">{footerNote}</span>
        <span className="a4-page-footer-scripture">
          &quot;{FOM_BRAND.greatCommissionText}&quot; - {FOM_BRAND.greatCommission}
        </span>
        <span className="a4-page-footer-page">
          Page {pageNumber} of {totalPages}
        </span>
      </footer>
    </section>
  );
}
