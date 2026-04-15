export type ActionStatus = "pending" | "in-progress" | "done";

export type ConferenceCore = {
  conferenceTitle: string;
  theme: string;
  themeVerse: string;
  holidayWindow: string;
  conferenceWindow: string;
  structure: string;
  venueAction: string;
  totalPeople: string;
  prayerFasting: string;
  arrivalInstruction: string;
  intro: string;
  teamIntro: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  responsibility: string;
};

export type ProgramSlot = {
  id: string;
  date: string;
  day: string;
  time: string;
  sessionType: string;
  activity: string;
  venue: string;
  lead: string;
  notes: string;
};

export type FormalLetter = {
  letterDate: string;
  referenceNo: string;
  recipientChurchName: string;
  recipientAddress: string;
  attentionLine: string;
  subject: string;
  openingSalutation: string;
  requestSummary: string;
  additionalRequest: string;
  closingPrayer: string;
  signatoryName: string;
  signatoryRole: string;
  signatoryPhone: string;
  signatoryEmail: string;
};

export type ActionItem = {
  id: string;
  task: string;
  owner: string;
  dueDate: string;
  status: ActionStatus;
  notes: string;
};

export type ConferenceDocumentData = {
  core: ConferenceCore;
  teamMembers: TeamMember[];
  programSlots: ProgramSlot[];
  actionItems: ActionItem[];
  formalLetter: FormalLetter;
};
