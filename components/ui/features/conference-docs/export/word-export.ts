import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  HeadingLevel,
  Packer,
  PageNumber,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  type ISectionOptions,
} from "docx";
import { downloadBlob, sanitizeFilename } from "./download-blob";
import { type ConferenceDocumentData } from "../types";
import { FOM_BRAND } from "@/lib/constants/fom";
import {
  FOM_COVENANT_LINE,
  FOM_LETTERHEAD,
  FOM_TAGLINE_LINE,
} from "../letterhead-config";

const WORD_MARGIN_NORMAL_TWIPS = 1440;
const WORD_HEADER_FOOTER_DISTANCE_TWIPS = 720;

const NO_TABLE_BORDERS = {
  top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
} as const;

function createEmptyHeader(): Header {
  return new Header({
    children: [new Paragraph({ text: "" })],
  });
}

function createCovenantHeader(): Header {
  return new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 0 },
        children: [
          new TextRun({
            size: 18,
            italics: true,
            text: FOM_COVENANT_LINE,
          }),
        ],
      }),
    ],
  });
}

function createDocFooter(note: string): Footer {
  const verseParagraph = new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0 },
    children: [
      new TextRun({
        size: 18,
        italics: true,
        text: FOM_TAGLINE_LINE,
      }),
    ],
  });

  const noteParagraph = new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 0, after: 0 },
    children: [
      new TextRun({
        size: 18,
        text: note,
      }),
    ],
  });

  const pageParagraph = new Paragraph({
    alignment: AlignmentType.RIGHT,
    spacing: { before: 0, after: 0 },
    children: [
      new TextRun({
        size: 18,
        children: ["Page ", PageNumber.CURRENT, " of ", PageNumber.TOTAL_PAGES],
      }),
    ],
  });

  return new Footer({
    children: [
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: NO_TABLE_BORDERS,
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 20, type: WidthType.PERCENTAGE },
                borders: NO_TABLE_BORDERS,
                children: [noteParagraph],
              }),
              new TableCell({
                width: { size: 60, type: WidthType.PERCENTAGE },
                borders: NO_TABLE_BORDERS,
                children: [verseParagraph],
              }),
              new TableCell({
                width: { size: 20, type: WidthType.PERCENTAGE },
                borders: NO_TABLE_BORDERS,
                children: [pageParagraph],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function centeredLine(text: string, bold = false): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text,
        bold,
      }),
    ],
  });
}

function buildStaticHeader(referenceLine?: string): Paragraph[] {
  const lines: Paragraph[] = [
    new Paragraph({
      text: FOM_LETTERHEAD.title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
    }),
    centeredLine(FOM_LETTERHEAD.location, true),
    centeredLine(`${FOM_LETTERHEAD.email} | ${FOM_LETTERHEAD.website}`),
    centeredLine(FOM_LETTERHEAD.phones.join(" | ")),
    centeredLine(FOM_COVENANT_LINE),
  ];

  if (referenceLine) {
    lines.push(centeredLine(referenceLine, true));
  }

  lines.push(new Paragraph({ text: "" }));

  return lines;
}

function heading(
  text: string,
  level: (typeof HeadingLevel)[keyof typeof HeadingLevel],
): Paragraph {
  return new Paragraph({
    text,
    heading: level,
    spacing: { before: 220, after: 120 },
  });
}

function body(text: string): Paragraph {
  return new Paragraph({
    text,
    spacing: { before: 80, after: 80 },
  });
}

function tableCell(text: string, widthPct: number): TableCell {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    children: [new Paragraph({ text: text || "-" })],
  });
}

function makeProgramTable(data: ConferenceDocumentData): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          tableCell("Date", 14),
          tableCell("Day", 10),
          tableCell("Time", 18),
          tableCell("Session", 14),
          tableCell("Activity", 20),
          tableCell("Venue", 14),
          tableCell("Lead", 10),
        ],
      }),
      ...data.programSlots.map(
        (slot) =>
          new TableRow({
            children: [
              tableCell(slot.date, 14),
              tableCell(slot.day, 10),
              tableCell(slot.time, 18),
              tableCell(slot.sessionType, 14),
              tableCell(slot.activity, 20),
              tableCell(slot.venue, 14),
              tableCell(slot.lead, 10),
            ],
          }),
      ),
    ],
  });
}

function makeActionTable(data: ConferenceDocumentData): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          tableCell("Task", 45),
          tableCell("Owner", 20),
          tableCell("Due Date", 15),
          tableCell("Status", 20),
        ],
      }),
      ...data.actionItems.map(
        (item) =>
          new TableRow({
            children: [
              tableCell(item.task, 45),
              tableCell(item.owner, 20),
              tableCell(item.dueDate, 15),
              tableCell(item.status, 20),
            ],
          }),
      ),
    ],
  });
}

function buildProgramSections(data: ConferenceDocumentData): ISectionOptions[] {
  const footer = createDocFooter(FOM_BRAND.name);

  return [
    {
      footers: {
        default: footer,
        first: footer,
      },
      headers: {
        first: createEmptyHeader(),
        default: createCovenantHeader(),
      },
      properties: {
        titlePage: true,
        page: {
          margin: {
            top: WORD_MARGIN_NORMAL_TWIPS,
            right: WORD_MARGIN_NORMAL_TWIPS,
            bottom: WORD_MARGIN_NORMAL_TWIPS,
            left: WORD_MARGIN_NORMAL_TWIPS,
            header: WORD_HEADER_FOOTER_DISTANCE_TWIPS,
            footer: WORD_HEADER_FOOTER_DISTANCE_TWIPS,
          },
        },
      },
      children: [
        ...buildStaticHeader(),
        new Paragraph({
          text: data.core.conferenceTitle,
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          text: data.core.conferenceWindow,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({ text: "" }),
        body(`Theme: \"${data.core.theme}\" (${data.core.themeVerse})`),
        body(`Holiday: ${data.core.holidayWindow}`),
        body(`Structure: ${data.core.structure}`),
        body(`Participants: ${data.core.totalPeople}`),
        body(`Arrival: ${data.core.arrivalInstruction}`),
        body(`Prayer and Fasting: ${data.core.prayerFasting}`),
        body(`Venue Action: ${data.core.venueAction}`),
        heading("Introduction", HeadingLevel.HEADING_2),
        body(data.core.intro),
        heading("Team", HeadingLevel.HEADING_2),
        body(data.core.teamIntro),
        heading("Program Schedule", HeadingLevel.HEADING_2),
        makeProgramTable(data),
        heading("Action Tracker", HeadingLevel.HEADING_2),
        makeActionTable(data),
      ],
    },
  ];
}

function buildLetterSections(data: ConferenceDocumentData): ISectionOptions[] {
  const footer = createDocFooter(FOM_BRAND.name);

  return [
    {
      footers: {
        default: footer,
        first: footer,
      },
      headers: {
        first: createEmptyHeader(),
        default: createCovenantHeader(),
      },
      properties: {
        titlePage: true,
        page: {
          margin: {
            top: WORD_MARGIN_NORMAL_TWIPS,
            right: WORD_MARGIN_NORMAL_TWIPS,
            bottom: WORD_MARGIN_NORMAL_TWIPS,
            left: WORD_MARGIN_NORMAL_TWIPS,
            header: WORD_HEADER_FOOTER_DISTANCE_TWIPS,
            footer: WORD_HEADER_FOOTER_DISTANCE_TWIPS,
          },
        },
      },
      children: [
        ...buildStaticHeader(`Reference: ${data.formalLetter.referenceNo}`),
        heading(data.core.conferenceTitle, HeadingLevel.HEADING_1),
        body(data.core.conferenceWindow),
        body(`Date: ${data.formalLetter.letterDate}`),
        body(`To: ${data.formalLetter.recipientChurchName}`),
        body(data.formalLetter.recipientAddress),
        body(`Attention: ${data.formalLetter.attentionLine}`),
        new Paragraph({ text: "" }),
        centeredLine(`Subject: ${data.formalLetter.subject}`, true),
        new Paragraph({ text: "" }),
        body(data.formalLetter.openingSalutation),
        body(data.formalLetter.requestSummary),
        body(
          `The ${data.core.conferenceTitle} is scheduled for ${data.core.conferenceWindow} during ${data.core.holidayWindow}. The conference theme is \"${data.core.theme}\" (${data.core.themeVerse}) with approximately ${data.core.totalPeople} participants.`,
        ),
        body(
          `The current structure is ${data.core.structure}. We respectfully request your guidance and support regarding venue readiness and coordination.`,
        ),
        body(data.formalLetter.additionalRequest),
        heading("Program Outline", HeadingLevel.HEADING_2),
        makeProgramTable(data),
        new Paragraph({ text: "" }),
        body(data.formalLetter.closingPrayer),
        body("Yours in Christ,"),
        body(data.formalLetter.signatoryName),
        body(data.formalLetter.signatoryRole),
        body(data.formalLetter.signatoryPhone),
        body(data.formalLetter.signatoryEmail),
      ],
    },
  ];
}

export async function exportConferenceProgramToDocx(
  data: ConferenceDocumentData,
  filename: string,
): Promise<void> {
  const document = new Document({
    sections: buildProgramSections(data),
  });

  const blob = await Packer.toBlob(document);
  downloadBlob(blob, `${sanitizeFilename(filename)}.docx`);
}

export async function exportFormalLetterToDocx(
  data: ConferenceDocumentData,
  filename: string,
): Promise<void> {
  const document = new Document({
    sections: buildLetterSections(data),
  });

  const blob = await Packer.toBlob(document);
  downloadBlob(blob, `${sanitizeFilename(filename)}.docx`);
}
