"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

type SectionCardHeaderProps = {
  title: string;
  addLabel: string;
  onAdd: () => void;
};

export function SectionCardHeader({
  title,
  addLabel,
  onAdd,
}: SectionCardHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>{title}</CardTitle>
      <Button size="sm" variant="outline" onClick={onAdd}>
        <Plus className="h-4 w-4" />
        {addLabel}
      </Button>
    </CardHeader>
  );
}
