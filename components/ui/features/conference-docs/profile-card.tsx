"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type ConferenceCore } from "./types";

type ProfileCardProps = {
  core: ConferenceCore;
  updateCore: (field: keyof ConferenceCore, value: string) => void;
};

export function ProfileCard({ core, updateCore }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conference Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Conference Title
            </label>
            <Input
              value={core.conferenceTitle}
              onChange={(event) =>
                updateCore("conferenceTitle", event.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Theme Verse
            </label>
            <Input
              value={core.themeVerse}
              onChange={(event) => updateCore("themeVerse", event.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">
              Conference Theme
            </label>
            <Input
              value={core.theme}
              onChange={(event) => updateCore("theme", event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Holiday Window
            </label>
            <Input
              value={core.holidayWindow}
              onChange={(event) =>
                updateCore("holidayWindow", event.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Conference Window
            </label>
            <Input
              value={core.conferenceWindow}
              onChange={(event) =>
                updateCore("conferenceWindow", event.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Program Structure
            </label>
            <Input
              value={core.structure}
              onChange={(event) => updateCore("structure", event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Total Participants
            </label>
            <Input
              value={core.totalPeople}
              onChange={(event) =>
                updateCore("totalPeople", event.target.value)
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">
              Arrival Instruction
            </label>
            <Input
              value={core.arrivalInstruction}
              onChange={(event) =>
                updateCore("arrivalInstruction", event.target.value)
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">
              Prayer and Fasting Note
            </label>
            <Input
              value={core.prayerFasting}
              onChange={(event) =>
                updateCore("prayerFasting", event.target.value)
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">
              Venue Action Note
            </label>
            <Input
              value={core.venueAction}
              onChange={(event) =>
                updateCore("venueAction", event.target.value)
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
