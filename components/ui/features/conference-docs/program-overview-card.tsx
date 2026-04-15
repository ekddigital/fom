"use client";

import { CalendarDays, Clock3, MapPin, UserRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { groupProgramSlotsByDay } from "./program-grouping";
import { type ProgramSlot } from "./types";

type ProgramOverviewCardProps = {
  slots: ProgramSlot[];
};

export function ProgramOverviewCard({ slots }: ProgramOverviewCardProps) {
  const dayGroups = groupProgramSlotsByDay(slots);

  return (
    <Card className="fom-print-hide border-[#0c436a]/15 bg-linear-to-br from-white to-[#ccdce3]/25">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <CalendarDays className="h-5 w-5 text-[#0c436a]" />
          Program Board by Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 lg:grid-cols-3">
          {dayGroups.map((group) => (
            <div
              key={group.key}
              className="rounded-xl border border-[#0c436a]/15 bg-white p-3 shadow-sm"
            >
              <div className="mb-3 border-b border-slate-200 pb-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0c436a]">
                  {group.day}
                </p>
                <p className="text-sm font-semibold text-slate-800">{group.date}</p>
              </div>

              <div className="space-y-2">
                {group.slots.map((slot) => (
                  <div
                    key={slot.id}
                    className="rounded-lg border border-slate-200 bg-slate-50/70 p-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900">
                        {slot.activity || "Untitled Session"}
                      </p>
                      <Badge
                        variant="outline"
                        className="border-[#0c436a]/30 bg-[#ccdce3]/40 text-[10px] text-[#0c436a]"
                      >
                        {slot.sessionType || "Session"}
                      </Badge>
                    </div>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-600">
                      <Clock3 className="h-3.5 w-3.5" />
                      {slot.time || "Time not set"}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-600">
                      <MapPin className="h-3.5 w-3.5" />
                      {slot.venue || "Venue not set"}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-600">
                      <UserRound className="h-3.5 w-3.5" />
                      {slot.lead || "Lead not assigned"}
                    </p>
                    {slot.notes ? (
                      <p className="mt-2 rounded-md bg-white px-2 py-1 text-xs text-slate-600">
                        {slot.notes}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
