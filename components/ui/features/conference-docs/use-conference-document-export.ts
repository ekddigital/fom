"use client";

import { useState } from "react";
import { toast } from "sonner";
import { exportA4ContainerToPdf } from "./export/pdf-export";
import {
  exportConferenceProgramToDocx,
  exportFormalLetterToDocx,
} from "./export/word-export";
import { type ConferenceDocumentData } from "./types";

type WorkspaceMode = "program" | "letter";

type UseConferenceDocumentExportParams = {
  data: ConferenceDocumentData;
  workspaceMode: WorkspaceMode;
  programContainerId: string;
  letterContainerId: string;
};

export function useConferenceDocumentExport({
  data,
  workspaceMode,
  programContainerId,
  letterContainerId,
}: UseConferenceDocumentExportParams) {
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isDownloadingWord, setIsDownloadingWord] = useState(false);

  const activePdfContainerId =
    workspaceMode === "program" ? programContainerId : letterContainerId;

  const activeBaseFilename =
    workspaceMode === "program"
      ? data.core.conferenceTitle
      : data.formalLetter.subject || "fom formal letter";

  const downloadPdf = async () => {
    try {
      setIsDownloadingPdf(true);
      await exportA4ContainerToPdf({
        containerId: activePdfContainerId,
        filename: activeBaseFilename,
      });
      toast.success("PDF downloaded successfully.");
    } catch (error) {
      console.error("Failed to export PDF:", error);
      const message =
        error instanceof Error ? error.message : "Unexpected export error.";
      toast.error(`Failed to export PDF: ${message}`);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const downloadWord = async () => {
    try {
      setIsDownloadingWord(true);

      if (workspaceMode === "program") {
        await exportConferenceProgramToDocx(data, activeBaseFilename);
      } else {
        await exportFormalLetterToDocx(data, activeBaseFilename);
      }

      toast.success("Word document downloaded successfully.");
    } catch (error) {
      console.error("Failed to export Word document:", error);
      const message =
        error instanceof Error ? error.message : "Unexpected export error.";
      toast.error(`Failed to export Word document: ${message}`);
    } finally {
      setIsDownloadingWord(false);
    }
  };

  return {
    isDownloadingPdf,
    isDownloadingWord,
    downloadPdf,
    downloadWord,
  };
}
