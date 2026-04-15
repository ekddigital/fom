"use client";

import { FOM_LOGO } from "@/lib/constants/fom";
import { FOM_COVENANT_LINE, FOM_LETTERHEAD } from "./letterhead-config";

type ConferenceLetterheadProps = {
  referenceLine?: string;
};

const LOGO_SIZE = 72;

export function ConferenceLetterhead({
  referenceLine,
}: ConferenceLetterheadProps) {
  return (
    <header className="border-b-2 border-[#0c436a]/70 pb-3">
      <div className="grid grid-cols-[72px_minmax(0,1fr)_72px] items-center gap-3">
        <div className="flex items-center justify-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={FOM_LOGO.png}
            alt={FOM_LOGO.alt}
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            loading="eager"
            style={{
              display: "block",
              width: `${LOGO_SIZE}px`,
              height: `${LOGO_SIZE}px`,
              objectFit: "contain",
            }}
          />
        </div>

        <div className="min-w-0 text-center">
          <h2 className="whitespace-nowrap text-[1.62rem] font-extrabold leading-tight tracking-[0.04em] text-[#0c436a]">
            {FOM_LETTERHEAD.title}
          </h2>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#496981]">
            {FOM_LETTERHEAD.location}
          </p>
          <p className="mt-1 text-[11px] text-slate-600">
            {FOM_LETTERHEAD.email} | {FOM_LETTERHEAD.website}
          </p>
          <p className="mt-1 text-[11px] text-slate-600">
            {FOM_LETTERHEAD.phones.join(" | ")}
          </p>
          <p className="mt-2 text-[11px] italic text-[#355873]">
            {FOM_COVENANT_LINE}
          </p>
          {referenceLine ? (
            <p className="mt-1 text-xs font-medium text-[#5e788d]">
              {referenceLine}
            </p>
          ) : null}
        </div>

        <div aria-hidden="true" />
      </div>
    </header>
  );
}
