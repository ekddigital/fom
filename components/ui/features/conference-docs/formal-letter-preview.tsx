"use client";

import { cn } from "@/lib/utils";
import { A4PageFrame } from "./a4-page-frame";
import { ConferenceLetterhead } from "./conference-letterhead";
import { groupProgramSlotsByDay } from "./program-grouping";
import { type ConferenceDocumentData } from "./types";

type FormalLetterPreviewProps = {
  data: ConferenceDocumentData;
  containerId?: string;
  className?: string;
};

const TOTAL_PAGES = 2;
const FOOTER_NOTE = "Fishers of Men";

export function FormalLetterPreview({
  data,
  containerId = "fom-formal-letter-preview",
  className,
}: FormalLetterPreviewProps) {
  const { core, formalLetter, programSlots } = data;
  const groupedProgram = groupProgramSlotsByDay(programSlots);

  return (
    <article
      id={containerId}
      className={cn("fom-print-root a4-stack mx-auto max-w-5xl", className)}
    >
      <A4PageFrame
        pageNumber={1}
        totalPages={TOTAL_PAGES}
        footerNote={FOOTER_NOTE}
      >
        <ConferenceLetterhead
          referenceLine={`Reference: ${formalLetter.referenceNo}`}
        />

        <section className="mt-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4f6d83]">
            Official Conference Letter
          </p>
          <h3 className="mt-1 text-2xl font-bold text-[#0c436a]">
            {core.conferenceTitle}
          </h3>
          <p className="mt-1 text-sm text-slate-600">{core.conferenceWindow}</p>
        </section>

        <div className="mt-3 border-b border-[#0c436a]/45" />

        <section className="mt-5 text-sm leading-7 text-slate-800">
          <p>
            <span className="font-semibold text-slate-900">Date:</span>{" "}
            {formalLetter.letterDate}
          </p>
          <p>
            <span className="font-semibold text-slate-900">To:</span>{" "}
            {formalLetter.recipientChurchName}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Address:</span>{" "}
            <span className="whitespace-pre-line">
              {formalLetter.recipientAddress}
            </span>
          </p>
          <p>
            <span className="font-semibold text-slate-900">Attention:</span>{" "}
            {formalLetter.attentionLine}
          </p>
        </section>

        <section className="mt-4 border-b border-[#0c436a]/45 pb-2">
          <p className="text-center text-sm font-bold uppercase tracking-wide text-[#1b405b]">
            Subject: {formalLetter.subject}
          </p>
        </section>

        <section className="mt-4 space-y-4 text-[15px] leading-8 text-slate-800">
          <p className="font-semibold text-[#214862]">
            {formalLetter.openingSalutation}
          </p>
          <p>{formalLetter.requestSummary}</p>
          <p>
            The {core.conferenceTitle} is scheduled for {core.conferenceWindow}{" "}
            as part of the holiday period ({core.holidayWindow}). The conference
            theme is &quot;{core.theme}&quot; ({core.themeVerse}), and we are
            preparing for approximately {core.totalPeople} participants.
          </p>
          <p>
            The current structure is {core.structure}. We respectfully request
            your guidance and support in relation to venue readiness and
            coordination.
          </p>
          <p>{formalLetter.additionalRequest}</p>
          <p>{formalLetter.closingPrayer}</p>
          <div className="pt-2 text-sm leading-7">
            Yours in Christ,
            <br />
            <span className="font-semibold">{formalLetter.signatoryName}</span>
            <br />
            {formalLetter.signatoryRole}
            <br />
            {formalLetter.signatoryPhone}
            <br />
            {formalLetter.signatoryEmail}
          </div>
        </section>
      </A4PageFrame>

      <A4PageFrame
        pageNumber={2}
        totalPages={TOTAL_PAGES}
        footerNote={FOOTER_NOTE}
        showCovenantHeader
        marginPreset="word"
      >
        <section className="mt-0 border-b border-[#0c436a]/45 pb-2">
          <h3 className="text-lg font-bold text-[#0c436a]">
            Conference Program Appendix
          </h3>
          <p className="text-sm text-slate-600">
            Consolidated timeline from the live program planner.
          </p>
        </section>

        <section className="mt-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
            Program Outline (Auto from Planner)
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Generated from the live planner timeline and grouped by day.
          </p>
          <table className="mt-2 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-50 text-left text-slate-700">
                <th className="px-3 py-2">Day</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Sessions</th>
              </tr>
            </thead>
            <tbody>
              {groupedProgram.map((group) => (
                <tr
                  key={group.key}
                  className="border-b border-slate-200 align-top"
                >
                  <td className="px-3 py-2 font-medium">{group.day}</td>
                  <td className="px-3 py-2">{group.date}</td>
                  <td className="px-3 py-2">
                    <ul className="space-y-1">
                      {group.slots.map((slot) => (
                        <li key={slot.id}>
                          {slot.time || "Time"} - {slot.activity || "Activity"}
                          {slot.venue ? ` (${slot.venue})` : ""}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </A4PageFrame>
    </article>
  );
}
