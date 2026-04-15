"use client";

import { cn } from "@/lib/utils";
import { A4PageFrame } from "./a4-page-frame";
import { ConferenceLetterhead } from "./conference-letterhead";
import { STATUS_LABELS } from "./defaults";
import { type ConferenceDocumentData } from "./types";

type PrintDocumentProps = {
  data: ConferenceDocumentData;
  containerId?: string;
  className?: string;
};

const TOTAL_PAGES = 3;
const FOOTER_NOTE = "Fishers of Men";
const SECTION_RULE_CLASS = "mt-0 border-b border-[#0c436a]/45 pb-2";
const TABLE_HEAD_ROW_CLASS =
  "border-b border-slate-300 bg-slate-50 text-left text-slate-700";

export function PrintDocument({
  data,
  containerId = "fom-conference-print-document",
  className,
}: PrintDocumentProps) {
  return (
    <div
      id={containerId}
      className={cn("fom-print-root a4-stack mx-auto max-w-5xl", className)}
    >
      <A4PageFrame
        pageNumber={1}
        totalPages={TOTAL_PAGES}
        footerNote={FOOTER_NOTE}
      >
        <ConferenceLetterhead />

        <section className="mt-5 border-b-2 border-[#0c436a]/70 pb-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#365a76]">
            Annual Conference Dossier
          </p>
          <h3 className="mt-1 text-3xl font-bold text-[#0c436a]">
            {data.core.conferenceTitle}
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-700">
            {data.core.conferenceWindow}
          </p>
        </section>

        <section className="mt-6 border-l-4 border-[#0c436a] bg-[#eef4f8] px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#355873]">
            Theme
          </p>
          <blockquote className="mt-2 text-center">
            <p className="text-[2rem] font-bold leading-tight text-[#0c436a]">
              &quot;{data.core.theme}&quot;
            </p>
            <p className="mt-2 text-base font-semibold text-[#436c87]">
              {data.core.themeVerse}
            </p>
          </blockquote>
        </section>
        <section className="mt-5 space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Introduction</h3>
          <p className="text-sm leading-6 text-slate-700">{data.core.intro}</p>
        </section>

        <section className="mt-5">
          <h3 className="text-lg font-semibold text-slate-900">
            Conference Snapshot
          </h3>
          <div className="mt-2 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            <p>
              <span className="font-semibold">Holiday:</span>{" "}
              {data.core.holidayWindow}
            </p>
            <p>
              <span className="font-semibold">Conference:</span>{" "}
              {data.core.conferenceWindow}
            </p>
            <p>
              <span className="font-semibold">Structure:</span>{" "}
              {data.core.structure}
            </p>
            <p>
              <span className="font-semibold">Participants:</span>{" "}
              {data.core.totalPeople}
            </p>
            <p className="sm:col-span-2">
              <span className="font-semibold">Arrival:</span>{" "}
              {data.core.arrivalInstruction}
            </p>
            <p className="sm:col-span-2">
              <span className="font-semibold">Prayer and Fasting:</span>{" "}
              {data.core.prayerFasting}
            </p>
            <p className="sm:col-span-2">
              <span className="font-semibold">Venue Action:</span>{" "}
              {data.core.venueAction}
            </p>
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
        <section className={SECTION_RULE_CLASS}>
          <h3 className="text-lg font-bold text-[#0c436a]">
            Team and Execution Plan
          </h3>
          <p className="text-sm text-slate-600">
            Role assignment, operating responsibilities, and action tracking.
          </p>
        </section>

        <section className="mt-5">
          <h3 className="text-lg font-semibold text-slate-900">Team</h3>
          <p className="mt-1 text-sm leading-6 text-slate-700">
            {data.core.teamIntro}
          </p>
          <table className="mt-2 w-full border-collapse text-sm">
            <thead>
              <tr className={TABLE_HEAD_ROW_CLASS}>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2">Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {data.teamMembers.map((member) => (
                <tr key={member.id} className="border-b border-slate-200">
                  <td className="px-3 py-2">{member.name || "TBD"}</td>
                  <td className="px-3 py-2">{member.role || "-"}</td>
                  <td className="px-3 py-2">{member.responsibility || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-5">
          <h3 className="text-lg font-semibold text-slate-900">
            Action Tracker
          </h3>
          <table className="mt-2 w-full border-collapse text-sm">
            <thead>
              <tr className={TABLE_HEAD_ROW_CLASS}>
                <th className="px-3 py-2">Task</th>
                <th className="px-3 py-2">Owner</th>
                <th className="px-3 py-2">Due</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.actionItems.map((item) => (
                <tr key={item.id} className="border-b border-slate-200">
                  <td className="px-3 py-2">{item.task || "-"}</td>
                  <td className="px-3 py-2">{item.owner || "-"}</td>
                  <td className="px-3 py-2">{item.dueDate || "-"}</td>
                  <td className="px-3 py-2 font-medium text-slate-700">
                    {STATUS_LABELS[item.status]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </A4PageFrame>

      <A4PageFrame
        pageNumber={3}
        totalPages={TOTAL_PAGES}
        footerNote={FOOTER_NOTE}
        showCovenantHeader
        marginPreset="word"
      >
        <section className={SECTION_RULE_CLASS}>
          <h3 className="text-lg font-bold text-[#0c436a]">Program Schedule</h3>
          <p className="text-sm text-slate-600">
            Ordered conference timeline, session flow, and assignment ownership.
          </p>
        </section>

        <table className="mt-4 w-full border-collapse text-sm">
          <thead>
            <tr className={TABLE_HEAD_ROW_CLASS}>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Day</th>
              <th className="px-3 py-2">Time</th>
              <th className="px-3 py-2">Session Type</th>
              <th className="px-3 py-2">Activity</th>
              <th className="px-3 py-2">Venue</th>
              <th className="px-3 py-2">Lead</th>
            </tr>
          </thead>
          <tbody>
            {data.programSlots.map((slot) => (
              <tr key={slot.id} className="border-b border-slate-200 align-top">
                <td className="px-3 py-2">{slot.date || "-"}</td>
                <td className="px-3 py-2">{slot.day || "-"}</td>
                <td className="px-3 py-2">{slot.time || "-"}</td>
                <td className="px-3 py-2">{slot.sessionType || "-"}</td>
                <td className="px-3 py-2">
                  <p>{slot.activity || "-"}</p>
                  {slot.notes ? (
                    <p className="mt-1 text-xs text-slate-500">{slot.notes}</p>
                  ) : null}
                </td>
                <td className="px-3 py-2">{slot.venue || "-"}</td>
                <td className="px-3 py-2">{slot.lead || "TBD"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </A4PageFrame>
    </div>
  );
}
