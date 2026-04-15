"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RemoveRowButton } from "./remove-row-button";
import { SectionCardHeader } from "./section-card-header";
import { type TeamMember } from "./types";

type TeamSlotsCardProps = {
  members: TeamMember[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (
    id: string,
    field: keyof Omit<TeamMember, "id">,
    value: string,
  ) => void;
};

export function TeamSlotsCard({
  members,
  onAdd,
  onRemove,
  onUpdate,
}: TeamSlotsCardProps) {
  return (
    <Card className="fom-print-hide">
      <SectionCardHeader
        title="Planning Team Slots"
        addLabel="Add Team Slot"
        onAdd={onAdd}
      />
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="border-b text-left text-slate-600">
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Role</th>
              <th className="px-2 py-2">Responsibility</th>
              <th className="w-[90px] px-2 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b align-top">
                <td className="px-2 py-2">
                  <Input
                    placeholder="Type name"
                    value={member.name}
                    onChange={(event) =>
                      onUpdate(member.id, "name", event.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    placeholder="Role"
                    value={member.role}
                    onChange={(event) =>
                      onUpdate(member.id, "role", event.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    placeholder="Responsibility"
                    value={member.responsibility}
                    onChange={(event) =>
                      onUpdate(member.id, "responsibility", event.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <RemoveRowButton
                    onClick={() => onRemove(member.id)}
                    label="Remove team slot"
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
