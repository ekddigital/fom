import type { Metadata } from "next";
import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";
import { GraduatesCelebrationFlyerShell } from "@/components/jicf/graduates-celebration-flyer";

export const metadata: Metadata = {
  title: "JICF Graduates Service, Celebration & Dinner 2026",
  description:
    "JICF Graduates Service, Celebration & Dinner — Sunday, June 14, 2026. Service from 14:30 to 17:00, dinner after service.",
};

export default function JICFGraduatesCelebrationPage() {
  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-linear-to-b from-[#172554] via-[#0c436a] to-[#172554]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-6">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#fbbf24] mb-2">
              JICF 2026 Special Event
            </p>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Graduates Service, Celebration &amp; Dinner
            </h1>
            <p className="mt-2 text-sm text-[#ccdce3]/80">
              Sunday, June 14, 2026 · Service: 14:30-17:00 · Dinner follows
            </p>
          </div>

          <GraduatesCelebrationFlyerShell />
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
