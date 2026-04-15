import { type ProgramSlot } from "./types";

export type ProgramDayGroup = {
  key: string;
  date: string;
  day: string;
  slots: ProgramSlot[];
};

export function groupProgramSlotsByDay(slots: ProgramSlot[]): ProgramDayGroup[] {
  const groups = new Map<string, ProgramDayGroup>();

  slots.forEach((slot) => {
    const safeDate = slot.date || "Date not set";
    const safeDay = slot.day || "Day not set";
    const key = `${safeDate}__${safeDay}`;

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        date: safeDate,
        day: safeDay,
        slots: [],
      });
    }

    groups.get(key)!.slots.push(slot);
  });

  return Array.from(groups.values());
}
