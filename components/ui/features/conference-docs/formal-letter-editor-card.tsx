"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type FormalLetter } from "./types";

type FormalLetterEditorCardProps = {
  letter: FormalLetter;
  updateLetter: (field: keyof FormalLetter, value: string) => void;
};

export function FormalLetterEditorCard({
  letter,
  updateLetter,
}: FormalLetterEditorCardProps) {
  return (
    <Card className="fom-print-hide">
      <CardHeader>
        <CardTitle>Formal Letter Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Letter Date</label>
            <Input
              value={letter.letterDate}
              onChange={(event) => updateLetter("letterDate", event.target.value)}
              placeholder="April 15, 2026"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Reference No.</label>
            <Input
              value={letter.referenceNo}
              onChange={(event) => updateLetter("referenceNo", event.target.value)}
              placeholder="FOM/CONF/2026/001"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Recipient Church</label>
            <Input
              value={letter.recipientChurchName}
              onChange={(event) =>
                updateLetter("recipientChurchName", event.target.value)
              }
              placeholder="Church name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Attention Line</label>
            <Input
              value={letter.attentionLine}
              onChange={(event) => updateLetter("attentionLine", event.target.value)}
              placeholder="Pastor name"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Recipient Address</label>
            <Input
              value={letter.recipientAddress}
              onChange={(event) => updateLetter("recipientAddress", event.target.value)}
              placeholder="Church address"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Subject</label>
            <Input
              value={letter.subject}
              onChange={(event) => updateLetter("subject", event.target.value)}
              placeholder="Letter subject"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Opening Salutation</label>
            <Input
              value={letter.openingSalutation}
              onChange={(event) =>
                updateLetter("openingSalutation", event.target.value)
              }
              placeholder="Dear Reverend Pastor,"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Primary Request Summary</label>
            <Textarea
              rows={3}
              value={letter.requestSummary}
              onChange={(event) => updateLetter("requestSummary", event.target.value)}
              placeholder="Main request paragraph"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Additional Request Details</label>
            <Textarea
              rows={3}
              value={letter.additionalRequest}
              onChange={(event) =>
                updateLetter("additionalRequest", event.target.value)
              }
              placeholder="Specific support requested"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Closing Blessing</label>
            <Textarea
              rows={2}
              value={letter.closingPrayer}
              onChange={(event) => updateLetter("closingPrayer", event.target.value)}
              placeholder="Closing blessing"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Signatory Name</label>
            <Input
              value={letter.signatoryName}
              onChange={(event) => updateLetter("signatoryName", event.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Signatory Role</label>
            <Input
              value={letter.signatoryRole}
              onChange={(event) => updateLetter("signatoryRole", event.target.value)}
              placeholder="Role"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Signatory Phone</label>
            <Input
              value={letter.signatoryPhone}
              onChange={(event) => updateLetter("signatoryPhone", event.target.value)}
              placeholder="Phone"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Signatory Email</label>
            <Input
              value={letter.signatoryEmail}
              onChange={(event) => updateLetter("signatoryEmail", event.target.value)}
              placeholder="Email"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
