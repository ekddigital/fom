import { createDefaultConferenceDocument } from "./defaults";
import {
  type ActionItem,
  type ActionStatus,
  type ConferenceDocumentData,
  type ProgramSlot,
  type TeamMember,
} from "./types";

export function createId(prefix: string) {
  const randomPart = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${Date.now()}-${randomPart}`;
}

function isActionStatus(value: unknown): value is ActionStatus {
  return value === "pending" || value === "in-progress" || value === "done";
}

export function createEmptyTeamMember(): TeamMember {
  return {
    id: createId("team"),
    name: "",
    role: "",
    responsibility: "",
  };
}

export function createEmptyProgramSlot(): ProgramSlot {
  return {
    id: createId("slot"),
    date: "",
    day: "",
    time: "",
    sessionType: "",
    activity: "",
    venue: "",
    lead: "",
    notes: "",
  };
}

export function createEmptyActionItem(): ActionItem {
  return {
    id: createId("act"),
    task: "",
    owner: "",
    dueDate: "",
    status: "pending",
    notes: "",
  };
}

export function updateItemById<T extends { id: string }>(
  items: T[],
  id: string,
  patch: Partial<T>,
): T[] {
  return items.map((item) => (item.id === id ? { ...item, ...patch } : item));
}

export function removeItemById<T extends { id: string }>(
  items: T[],
  id: string,
): T[] {
  return items.filter((item) => item.id !== id);
}

export function mergeStoredDocument(
  input: Partial<ConferenceDocumentData>,
): ConferenceDocumentData {
  const defaults = createDefaultConferenceDocument();

  const safeCore = {
    ...defaults.core,
    ...(input.core || {}),
  };

  const safeTeamMembers = Array.isArray(input.teamMembers)
    ? input.teamMembers.map((member, index) => ({
        id: member.id || createId(`team-${index + 1}`),
        name: member.name || "",
        role: member.role || "",
        responsibility: member.responsibility || "",
      }))
    : defaults.teamMembers;

  const safeProgramSlots = Array.isArray(input.programSlots)
    ? input.programSlots.map((slot, index) => ({
        id: slot.id || createId(`slot-${index + 1}`),
        date: slot.date || "",
        day: slot.day || "",
        time: slot.time || "",
        sessionType: slot.sessionType || "",
        activity: slot.activity || "",
        venue: slot.venue || "",
        lead: slot.lead || "",
        notes: slot.notes || "",
      }))
    : defaults.programSlots;

  const safeActionItems = Array.isArray(input.actionItems)
    ? input.actionItems.map((action, index) => ({
        id: action.id || createId(`act-${index + 1}`),
        task: action.task || "",
        owner: action.owner || "",
        dueDate: action.dueDate || "",
        status: isActionStatus(action.status) ? action.status : "pending",
        notes: action.notes || "",
      }))
    : defaults.actionItems;

  const safeFormalLetter = {
    ...defaults.formalLetter,
    ...(input.formalLetter || {}),
  };

  return {
    core: safeCore,
    teamMembers: safeTeamMembers,
    programSlots: safeProgramSlots,
    actionItems: safeActionItems,
    formalLetter: safeFormalLetter,
  };
}
