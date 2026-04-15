"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RemoveRowButton } from "./remove-row-button";
import { SectionCardHeader } from "./section-card-header";
import { type ActionItem } from "./types";

type ActionTrackerCardProps = {
  actionItems: ActionItem[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (
    id: string,
    field: keyof Omit<ActionItem, "id">,
    value: string,
  ) => void;
};

export function ActionTrackerCard({
  actionItems,
  onAdd,
  onRemove,
  onUpdate,
}: ActionTrackerCardProps) {
  return (
    <Card className="fom-print-hide">
      <SectionCardHeader
        title="Action Tracker"
        addLabel="Add Action"
        onAdd={onAdd}
      />
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-sm">
          <thead>
            <tr className="border-b text-left text-slate-600">
              <th className="px-2 py-2">Task</th>
              <th className="px-2 py-2">Owner</th>
              <th className="px-2 py-2">Due Date</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Notes</th>
              <th className="w-[90px] px-2 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {actionItems.map((item) => (
              <tr key={item.id} className="border-b align-top">
                <td className="px-2 py-2">
                  <Input
                    placeholder="Action task"
                    value={item.task}
                    onChange={(event) =>
                      onUpdate(item.id, "task", event.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    placeholder="Owner"
                    value={item.owner}
                    onChange={(event) =>
                      onUpdate(item.id, "owner", event.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    type="date"
                    value={item.dueDate}
                    onChange={(event) =>
                      onUpdate(item.id, "dueDate", event.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <select
                    value={item.status}
                    onChange={(event) =>
                      onUpdate(item.id, "status", event.target.value)
                    }
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </td>
                <td className="px-2 py-2">
                  <Input
                    placeholder="Add note"
                    value={item.notes}
                    onChange={(event) =>
                      onUpdate(item.id, "notes", event.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <RemoveRowButton
                    onClick={() => onRemove(item.id)}
                    label="Remove action item"
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
