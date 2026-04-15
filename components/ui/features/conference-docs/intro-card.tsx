"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { type ConferenceCore } from "./types";

type IntroCardProps = {
  core: ConferenceCore;
  lastSavedAt: string;
  updateCore: (field: keyof ConferenceCore, value: string) => void;
};

export function IntroCard({ core, lastSavedAt, updateCore }: IntroCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Introduction and Team Narrative</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Conference Introduction
          </label>
          <Textarea
            rows={6}
            value={core.intro}
            onChange={(event) => updateCore("intro", event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Team Introduction
          </label>
          <Textarea
            rows={5}
            value={core.teamIntro}
            onChange={(event) => updateCore("teamIntro", event.target.value)}
          />
        </div>
        <p className="text-xs text-slate-500">
          Auto-save is on{lastSavedAt ? ` (last saved at ${lastSavedAt})` : ""}.
        </p>
      </CardContent>
    </Card>
  );
}
