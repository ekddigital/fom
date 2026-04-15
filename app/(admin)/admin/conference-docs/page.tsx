import type { Metadata } from "next";
import { FomConferenceDocumentSystem } from "../../../../components/ui/features/fom-conference-document-system";

export const metadata: Metadata = {
  title: "Conference Document System | FOM Admin",
  description:
    "Create and maintain FOM conference program documents and formal letterhead requests with editable slots and print-ready output.",
};

export default function ConferenceDocumentSystemPage() {
  return <FomConferenceDocumentSystem />;
}
