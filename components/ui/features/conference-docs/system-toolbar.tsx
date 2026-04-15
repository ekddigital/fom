"use client";

import {
  Cloud,
  CloudOff,
  Database,
  Download,
  CalendarDays,
  ClipboardList,
  Printer,
  RefreshCw,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type SystemToolbarProps = {
  conferenceWindow: string;
  totalPeople: string;
  completedActions: number;
  totalActions: number;
  syncStatus:
    | "loading"
    | "database"
    | "database-unavailable"
    | "local-only"
    | "local-fallback";
  syncMessage: string;
  isSyncing: boolean;
  workspaceMode: "program" | "letter";
  programViewMode: "planner" | "preview";
  letterViewMode: "editor" | "preview";
  onOpenProgramPlanner: () => void;
  onOpenProgramPreview: () => void;
  onOpenLetterEditor: () => void;
  onOpenLetterPreview: () => void;
  printLabel: string;
  onDownloadPdf: () => void;
  onDownloadWord: () => void;
  isDownloadingPdf: boolean;
  isDownloadingWord: boolean;
  onResetTemplate: () => void;
  onPrint: () => void;
};

export function SystemToolbar({
  conferenceWindow,
  totalPeople,
  completedActions,
  totalActions,
  syncStatus,
  syncMessage,
  isSyncing,
  workspaceMode,
  programViewMode,
  letterViewMode,
  onOpenProgramPlanner,
  onOpenProgramPreview,
  onOpenLetterEditor,
  onOpenLetterPreview,
  printLabel,
  onDownloadPdf,
  onDownloadWord,
  isDownloadingPdf,
  isDownloadingWord,
  onResetTemplate,
  onPrint,
}: SystemToolbarProps) {
  const syncBadgeTone =
    syncStatus === "database"
      ? "border-emerald-500/30 text-emerald-700"
      : syncStatus === "loading"
        ? "border-slate-300 text-slate-600"
        : "border-amber-500/30 text-amber-700";

  const syncBadgeLabel =
    syncStatus === "database"
      ? "Database sync"
      : syncStatus === "loading"
        ? "Loading sync"
        : syncStatus === "database-unavailable"
          ? "Local only (DB unavailable)"
          : syncStatus === "local-only"
            ? "Local only"
            : "Local fallback";

  const currentViewLabel =
    workspaceMode === "program"
      ? programViewMode === "planner"
        ? "Program Planner"
        : "Program A4 Preview"
      : letterViewMode === "editor"
        ? "Letter Workspace"
        : "Letter A4 Preview";

  return (
    <div className="fom-print-hide rounded-2xl border border-[#0c436a]/20 bg-linear-to-br from-white via-[#f6fbff] to-[#ecf4fb] p-5 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          FOM Conference Document System
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Build the conference introduction, assign people to slots, and keep a
          printable official program.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="border-[#0c436a]/30 text-[#0c436a]"
          >
            <CalendarDays className="mr-1 h-3 w-3" />
            {conferenceWindow}
          </Badge>
          <Badge
            variant="outline"
            className="border-[#0c436a]/30 text-[#0c436a]"
          >
            <Users className="mr-1 h-3 w-3" />
            {totalPeople} participants
          </Badge>
          <Badge
            variant="outline"
            className="border-emerald-500/30 text-emerald-700"
          >
            <ClipboardList className="mr-1 h-3 w-3" />
            {completedActions}/{totalActions} actions complete
          </Badge>
          <Badge variant="outline" className={syncBadgeTone}>
            {syncStatus === "database" ? (
              <Database className="mr-1 h-3 w-3" />
            ) : (
              <CloudOff className="mr-1 h-3 w-3" />
            )}
            {isSyncing ? "Syncing..." : syncBadgeLabel}
          </Badge>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onResetTemplate}>
            <RefreshCw className="h-4 w-4" />
            Reset Template
          </Button>
          <Button
            variant="outline"
            onClick={onDownloadPdf}
            disabled={isDownloadingPdf || isDownloadingWord}
          >
            <Download className="h-4 w-4" />
            {isDownloadingPdf ? "Downloading PDF..." : "Download PDF"}
          </Button>
          <Button
            variant="outline"
            onClick={onDownloadWord}
            disabled={isDownloadingPdf || isDownloadingWord}
          >
            <Download className="h-4 w-4" />
            {isDownloadingWord ? "Downloading Word..." : "Download Word"}
          </Button>
          <Button onClick={onPrint}>
            <Printer className="h-4 w-4" />
            {printLabel}
          </Button>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white/80 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Quick View
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={
                workspaceMode === "program" && programViewMode === "planner"
                  ? "default"
                  : "outline"
              }
              onClick={onOpenProgramPlanner}
            >
              Program Planner
            </Button>
            <Button
              size="sm"
              variant={
                workspaceMode === "program" && programViewMode === "preview"
                  ? "default"
                  : "outline"
              }
              onClick={onOpenProgramPreview}
            >
              Program A4 Preview
            </Button>
            <Button
              size="sm"
              variant={
                workspaceMode === "letter" && letterViewMode === "editor"
                  ? "default"
                  : "outline"
              }
              onClick={onOpenLetterEditor}
            >
              Letter Workspace
            </Button>
            <Button
              size="sm"
              variant={
                workspaceMode === "letter" && letterViewMode === "preview"
                  ? "default"
                  : "outline"
              }
              onClick={onOpenLetterPreview}
            >
              Letter A4 Preview
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <Cloud className="h-3.5 w-3.5" />
            <span>Current view: {currentViewLabel}</span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">{syncMessage}</p>
      <p className="mt-1 text-xs text-slate-500">
        In the print dialog, choose Save as PDF and keep paper size as A4.
      </p>
    </div>
  );
}
