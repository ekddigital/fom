"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type RemoveRowButtonProps = {
  onClick: () => void;
  label: string;
};

export function RemoveRowButton({ onClick, label }: RemoveRowButtonProps) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick} aria-label={label}>
      <Trash2 className="h-4 w-4 text-red-600" />
    </Button>
  );
}
