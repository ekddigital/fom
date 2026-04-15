import {
  type ActionStatus,
  type ConferenceCore,
  type ConferenceDocumentData,
  type FormalLetter,
  type TeamMember,
  type ProgramSlot,
  type ActionItem,
} from "./types";
import { FOM_LETTERHEAD } from "./letterhead-config";

export const STORAGE_KEY = "fom-conference-document-system-v1";

export const STATUS_LABELS: Record<ActionStatus, string> = {
  pending: "Pending",
  "in-progress": "In Progress",
  done: "Done",
};

export const STATUS_CLASSNAMES: Record<ActionStatus, string> = {
  pending: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  "in-progress": "bg-blue-500/10 text-blue-700 border-blue-500/30",
  done: "bg-green-500/10 text-green-700 border-green-500/30",
};

const DEFAULT_CORE: ConferenceCore = {
  conferenceTitle: "FOM Yearly Conference 2026",
  theme: "If God be for us..",
  themeVerse: "Romans 8:31",
  holidayWindow: "Friday, May 1st to Tuesday, May 5th, 2026",
  conferenceWindow: "May 1 - 3, 2026",
  structure: "3 Days -> 1 day arrival, 2 days of teaching",
  venueAction:
    "Confirm and finalize venue logistics at Hangzhou City, Zhejiang Province with Pastor Dikki.",
  totalPeople: "25",
  prayerFasting:
    "FOM Monthly Prayer and Fasting: Do a dry fast on April 29, 2026.",
  arrivalInstruction:
    "Make sure your arrival time is before 6:00 AM on May 1, 2026.",
  intro:
    "Welcome to the FOM yearly conference preparation document. This working plan gives the team one organized source for introduction notes, role assignments, time slots, and execution actions as we prepare for our gathering in Hangzhou City, Zhejiang Province.",
  teamIntro:
    "The conference team serves in unity to coordinate venue logistics, communication, program flow, and ministry support for all participants.",
};

const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    name: "",
    role: "Conference Lead",
    responsibility: "Overall coordination and approvals",
  },
  {
    id: "team-2",
    name: "",
    role: "Program Coordinator",
    responsibility: "Workshop flow and speaker schedules",
  },
  {
    id: "team-3",
    name: "",
    role: "Venue and Logistics",
    responsibility: "Accommodation, arrival, and venue liaison",
  },
  {
    id: "team-4",
    name: "",
    role: "Prayer and Spiritual Support",
    responsibility: "Prayer sessions and fasting reminders",
  },
];

const DEFAULT_PROGRAM_SLOTS: ProgramSlot[] = [
  {
    id: "slot-1",
    date: "May 1, 2026",
    day: "Friday",
    time: "Before 6:00 AM",
    sessionType: "Arrival",
    activity: "Arrival and check-in",
    venue: "Main Venue Reception",
    lead: "Logistics Team",
    notes: "All participants should arrive before 6:00 AM",
  },
  {
    id: "slot-2",
    date: "May 1, 2026",
    day: "Friday",
    time: "1:00 PM - 4:00 PM",
    sessionType: "Teaching",
    activity: "Workshop 1",
    venue: "Main Hall",
    lead: "Program Team",
    notes: "Main teaching session",
  },
  {
    id: "slot-3",
    date: "May 2, 2026",
    day: "Saturday",
    time: "10:00 AM - 12:00 PM",
    sessionType: "Teaching",
    activity: "Workshop 2",
    venue: "Main Hall",
    lead: "Program Team",
    notes: "Morning teaching block",
  },
  {
    id: "slot-4",
    date: "May 2, 2026",
    day: "Saturday",
    time: "2:00 PM - 5:00 PM",
    sessionType: "Teaching",
    activity: "Workshop 3",
    venue: "Main Hall",
    lead: "Program Team",
    notes: "Afternoon teaching block",
  },
  {
    id: "slot-5",
    date: "May 3, 2026",
    day: "Sunday",
    time: "Evening",
    sessionType: "Closing",
    activity: "Site Seeing and Prayer Night",
    venue: "Designated outing/prayer location",
    lead: "Program and Prayer Teams",
    notes: "Close conference activities",
  },
];

const DEFAULT_ACTION_ITEMS: ActionItem[] = [
  {
    id: "act-1",
    task: "Send venue communication to Pastor Dikki",
    owner: "Conference Lead",
    dueDate: "2026-04-20",
    status: "pending",
    notes: "Confirm venue details and expected participant count",
  },
  {
    id: "act-2",
    task: "Publish fasting reminder for April 29 dry fast",
    owner: "Prayer Team",
    dueDate: "2026-04-25",
    status: "pending",
    notes: "Share on all group channels",
  },
  {
    id: "act-3",
    task: "Finalize participant list",
    owner: "Admin and Registration Team",
    dueDate: "2026-04-27",
    status: "in-progress",
    notes: "Target count is 25 people",
  },
  {
    id: "act-4",
    task: "Confirm all arrivals before May 1, 6:00 AM",
    owner: "Logistics Team",
    dueDate: "2026-04-30",
    status: "pending",
    notes: "Track travel plans and contact late arrivals",
  },
];

const DEFAULT_FORMAL_LETTER: FormalLetter = {
  letterDate: "April 15, 2026",
  referenceNo: "FOM/CONF/2026/001",
  recipientChurchName: "[Recipient Church Name]",
  recipientAddress: "[Recipient Church Address]",
  attentionLine: "Pastor Dikki",
  subject: "Formal Request for Venue Support for FOM Yearly Conference 2026",
  openingSalutation: "Dear Reverend Pastor,",
  requestSummary:
    "On behalf of Fishers of Men, we respectfully write to formally request your support and partnership regarding venue arrangements in Hangzhou City, Zhejiang Province for our upcoming yearly conference.",
  additionalRequest:
    "Kindly advise us on venue availability in Hangzhou, expected protocol, and any administrative steps required from our team.",
  closingPrayer:
    "We remain grateful for your leadership and prayers. May the Lord continue to strengthen your ministry.",
  signatoryName: "[Your Name]",
  signatoryRole: "Conference Lead, Fishers of Men",
  signatoryPhone: FOM_LETTERHEAD.phones.join(", "),
  signatoryEmail: FOM_LETTERHEAD.email,
};

export function createDefaultConferenceDocument(): ConferenceDocumentData {
  return {
    core: { ...DEFAULT_CORE },
    teamMembers: DEFAULT_TEAM_MEMBERS.map((member) => ({ ...member })),
    programSlots: DEFAULT_PROGRAM_SLOTS.map((slot) => ({ ...slot })),
    actionItems: DEFAULT_ACTION_ITEMS.map((item) => ({ ...item })),
    formalLetter: { ...DEFAULT_FORMAL_LETTER },
  };
}
