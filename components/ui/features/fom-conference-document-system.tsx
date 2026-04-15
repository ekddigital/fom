"use client";

import { useState } from "react";
import { ActionTrackerCard } from "./conference-docs/action-tracker-card";
import { FormalLetterEditorCard } from "./conference-docs/formal-letter-editor-card";
import { FormalLetterPreview } from "./conference-docs/formal-letter-preview";
import { IntroCard } from "./conference-docs/intro-card";
import { PrintDocument } from "./conference-docs/print-document";
import { ConferencePrintStyles } from "./conference-docs/print-styles";
import { ProfileCard } from "./conference-docs/profile-card";
import { ProgramOverviewCard } from "./conference-docs/program-overview-card";
import { ProgramSlotsCard } from "./conference-docs/program-slots-card";
import { SystemToolbar } from "./conference-docs/system-toolbar";
import { TeamSlotsCard } from "./conference-docs/team-slots-card";
import { useConferenceDocumentExport } from "./conference-docs/use-conference-document-export";
import { useConferenceDocumentState } from "./conference-docs/use-conference-document-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type WorkspaceMode = "program" | "letter";
type ProgramViewMode = "planner" | "preview";
type LetterViewMode = "editor" | "preview";

const PROGRAM_PREVIEW_CONTAINER_ID = "fom-conference-print-document-preview";
const PROGRAM_INLINE_PREVIEW_CONTAINER_ID = "fom-conference-inline-preview";
const PROGRAM_EXPORT_CONTAINER_ID = "fom-conference-print-document-export";
const LETTER_PREVIEW_CONTAINER_ID = "fom-formal-letter-preview-preview";
const LETTER_INLINE_PREVIEW_CONTAINER_ID = "fom-formal-letter-inline-preview";
const LETTER_EXPORT_CONTAINER_ID = "fom-formal-letter-preview-export";

const PRIMARY_SWITCHER_LIST_CLASS =
  "h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0";
const PRIMARY_SWITCHER_TRIGGER_CLASS =
  "h-9 flex-none rounded-md border border-[#0c436a]/25 bg-white px-4 text-sm font-semibold text-[#355873] shadow-sm transition hover:border-[#0c436a]/45 hover:text-[#0c436a] data-[state=active]:border-[#0c436a] data-[state=active]:bg-[#0c436a] data-[state=active]:text-white data-[state=active]:shadow";

const SECONDARY_SWITCHER_LIST_CLASS =
  "h-auto w-full flex-wrap justify-start gap-1.5 bg-transparent p-0";
const SECONDARY_SWITCHER_TRIGGER_CLASS =
  "h-8 flex-none rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-[#0c436a]/40 hover:text-[#0c436a] data-[state=active]:border-[#0c436a]/80 data-[state=active]:bg-[#e8f2f8] data-[state=active]:text-[#0c436a]";

export function FomConferenceDocumentSystem() {
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>("program");
  const [programViewMode, setProgramViewMode] =
    useState<ProgramViewMode>("planner");
  const [letterViewMode, setLetterViewMode] =
    useState<LetterViewMode>("editor");

  const {
    data,
    lastSavedAt,
    syncStatus,
    syncMessage,
    isSyncing,
    completedActions,
    updateCore,
    updateTeamMember,
    updateProgramSlot,
    updateActionItem,
    updateFormalLetter,
    addTeamMember,
    addProgramSlot,
    addActionItem,
    removeTeamMember,
    removeProgramSlot,
    removeActionItem,
    resetTemplate,
  } = useConferenceDocumentState();

  const { isDownloadingPdf, isDownloadingWord, downloadPdf, downloadWord } =
    useConferenceDocumentExport({
      data,
      workspaceMode,
      programContainerId: PROGRAM_EXPORT_CONTAINER_ID,
      letterContainerId: LETTER_EXPORT_CONTAINER_ID,
    });

  return (
    <div className="space-y-6">
      <ConferencePrintStyles />

      <SystemToolbar
        conferenceWindow={data.core.conferenceWindow}
        totalPeople={data.core.totalPeople}
        completedActions={completedActions}
        totalActions={data.actionItems.length}
        syncStatus={syncStatus}
        syncMessage={syncMessage}
        isSyncing={isSyncing}
        workspaceMode={workspaceMode}
        programViewMode={programViewMode}
        letterViewMode={letterViewMode}
        onOpenProgramPlanner={() => {
          setWorkspaceMode("program");
          setProgramViewMode("planner");
        }}
        onOpenProgramPreview={() => {
          setWorkspaceMode("program");
          setProgramViewMode("preview");
        }}
        onOpenLetterEditor={() => {
          setWorkspaceMode("letter");
          setLetterViewMode("editor");
        }}
        onOpenLetterPreview={() => {
          setWorkspaceMode("letter");
          setLetterViewMode("preview");
        }}
        printLabel={
          workspaceMode === "program" ? "Print Program" : "Print Formal Letter"
        }
        onDownloadPdf={downloadPdf}
        onDownloadWord={downloadWord}
        isDownloadingPdf={isDownloadingPdf}
        isDownloadingWord={isDownloadingWord}
        onResetTemplate={resetTemplate}
        onPrint={() => window.print()}
      />

      <Tabs
        value={workspaceMode}
        onValueChange={(value) => setWorkspaceMode(value as WorkspaceMode)}
      >
        <div className="fom-print-hide rounded-xl border border-[#0c436a]/20 bg-linear-to-r from-[#f8fbfe] to-[#edf5fb] p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#496981]">
            Workspace
          </p>
          <TabsList className={PRIMARY_SWITCHER_LIST_CLASS}>
            <TabsTrigger value="program" className={PRIMARY_SWITCHER_TRIGGER_CLASS}>
              Program Planner
            </TabsTrigger>
            <TabsTrigger value="letter" className={PRIMARY_SWITCHER_TRIGGER_CLASS}>
              Formal Letter Builder
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="program" className="space-y-6">
          <Tabs
            value={programViewMode}
            onValueChange={(value) =>
              setProgramViewMode(value as ProgramViewMode)
            }
          >
            <div className="fom-print-hide rounded-lg border border-[#0c436a]/15 bg-white p-2.5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Program View
              </p>
              <TabsList className={SECONDARY_SWITCHER_LIST_CLASS}>
                <TabsTrigger value="planner" className={SECONDARY_SWITCHER_TRIGGER_CLASS}>
                  Planner Workspace
                </TabsTrigger>
                <TabsTrigger value="preview" className={SECONDARY_SWITCHER_TRIGGER_CLASS}>
                  A4 Preview
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="planner" className="space-y-6">
              <div className="fom-print-hide grid gap-6 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="min-w-0 space-y-6">
                  <div className="grid gap-6 xl:grid-cols-2">
                    <ProfileCard core={data.core} updateCore={updateCore} />
                    <IntroCard
                      core={data.core}
                      lastSavedAt={lastSavedAt}
                      updateCore={updateCore}
                    />
                  </div>

                  <ProgramOverviewCard slots={data.programSlots} />

                  <TeamSlotsCard
                    members={data.teamMembers}
                    onAdd={addTeamMember}
                    onRemove={removeTeamMember}
                    onUpdate={updateTeamMember}
                  />

                  <ProgramSlotsCard
                    slots={data.programSlots}
                    onAdd={addProgramSlot}
                    onRemove={removeProgramSlot}
                    onUpdate={updateProgramSlot}
                  />

                  <ActionTrackerCard
                    actionItems={data.actionItems}
                    onAdd={addActionItem}
                    onRemove={removeActionItem}
                    onUpdate={updateActionItem}
                  />
                </div>

                <section className="space-y-3 rounded-xl border border-[#0c436a]/20 bg-white p-4 2xl:sticky 2xl:top-4 2xl:max-h-[calc(100vh-2rem)] 2xl:overflow-y-auto 2xl:pr-2">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      Live Program A4 Preview
                    </h3>
                    <p className="text-sm text-slate-600">
                      Edit on the left and watch the full program output update
                      on the right in real time.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200/80 bg-[#f2f8fc] p-3">
                    <PrintDocument
                      data={data}
                      containerId={PROGRAM_INLINE_PREVIEW_CONTAINER_ID}
                    />
                  </div>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="fom-preview-screen">
              <PrintDocument
                data={data}
                containerId={PROGRAM_PREVIEW_CONTAINER_ID}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="letter" className="space-y-6">
          <Tabs
            value={letterViewMode}
            onValueChange={(value) =>
              setLetterViewMode(value as LetterViewMode)
            }
          >
            <div className="fom-print-hide rounded-lg border border-[#0c436a]/15 bg-white p-2.5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Letter View
              </p>
              <TabsList className={SECONDARY_SWITCHER_LIST_CLASS}>
                <TabsTrigger value="editor" className={SECONDARY_SWITCHER_TRIGGER_CLASS}>
                  Letter Workspace
                </TabsTrigger>
                <TabsTrigger value="preview" className={SECONDARY_SWITCHER_TRIGGER_CLASS}>
                  A4 Preview
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="editor" className="space-y-6">
              <div className="fom-print-hide grid gap-6 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="min-w-0">
                  <FormalLetterEditorCard
                    letter={data.formalLetter}
                    updateLetter={updateFormalLetter}
                  />
                </div>

                <section className="space-y-3 rounded-xl border border-[#0c436a]/20 bg-white p-4 2xl:sticky 2xl:top-4 2xl:max-h-[calc(100vh-2rem)] 2xl:overflow-y-auto 2xl:pr-2">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      Live Formal Letter A4 Preview
                    </h3>
                    <p className="text-sm text-slate-600">
                      Edit on the left and watch the formal letter and program
                      appendix update on the right.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200/80 bg-[#f2f8fc] p-3">
                    <FormalLetterPreview
                      data={data}
                      containerId={LETTER_INLINE_PREVIEW_CONTAINER_ID}
                    />
                  </div>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="fom-preview-screen">
              <FormalLetterPreview
                data={data}
                containerId={LETTER_PREVIEW_CONTAINER_ID}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>

      <div className="fom-export-source">
        {workspaceMode === "program" ? (
          <PrintDocument
            data={data}
            containerId={PROGRAM_EXPORT_CONTAINER_ID}
          />
        ) : (
          <FormalLetterPreview
            data={data}
            containerId={LETTER_EXPORT_CONTAINER_ID}
          />
        )}
      </div>
    </div>
  );
}
