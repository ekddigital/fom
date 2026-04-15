"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RemoveRowButton } from "./remove-row-button";
import { SectionCardHeader } from "./section-card-header";
import { type ProgramSlot } from "./types";

type ProgramSlotsCardProps = {
  slots: ProgramSlot[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (
    id: string,
    field: keyof Omit<ProgramSlot, "id">,
    value: string,
  ) => void;
};

export function ProgramSlotsCard({
  slots,
  onAdd,
  onRemove,
  onUpdate,
}: ProgramSlotsCardProps) {
  return (
    <Card className="fom-print-hide">
      <SectionCardHeader
        title="Program Timeline Slots"
        addLabel="Add Program Slot"
        onAdd={onAdd}
      />
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-295 border-collapse text-sm">
          <thead>
            <tr className="border-b text-left text-slate-600">
              <th className="px-2 py-2">Date</th>
              <th className="px-2 py-2">Day</th>
              <th className="px-2 py-2">Time</th>
              <th className="px-2 py-2">Session Type</th>
              <th className="px-2 py-2">Activity</th>
              <th className="px-2 py-2">Venue</th>
              <th className="px-2 py-2">Lead</th>
              <th className="px-2 py-2">Notes</th>
              <th className="w-22.5 px-2 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.id} className="border-b align-top">
                <td className="px-2 py-2">
                  <Input
                    placeholder="May 1, 2026"
                    value={slot.date}
                    onChange={(event) =>
                      onUpdate(slot.id, "date", event.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    placeholder="Friday"
                    value={slot.day}
                    onChange={(event) =>
                      onUpdate(slot.id, "day", event.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    placeholder="1:00 PM - 4:00 PM"
                    value={slot.time}
                    onChange={(event) =>
                      onUpdate(slot.id, "time", event.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    placeholder="Teaching / Arrival / Prayer"
                    value={slot.sessionType}
                    onChange={(event) =>
                      onUpdate(slot.id, "sessionType", event.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    placeholder="Workshop 1"
                    value={slot.activity}
                    onChange={(event) =>
                      onUpdate(slot.id, "activity", event.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    placeholder="Main Hall"
                    value={slot.venue}
                    onChange={(event) =>
                      onUpdate(slot.id, "venue", event.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    placeholder="Lead person"
                    value={slot.lead}
                    onChange={(event) =>
                      onUpdate(slot.id, "lead", event.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    placeholder="Add note"
                    value={slot.notes}
                    onChange={(event) =>
                      onUpdate(slot.id, "notes", event.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <RemoveRowButton
                    onClick={() => onRemove(slot.id)}
                    label="Remove program slot"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
