import type { Metadata } from "next";
import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";
import { EnglishTutoringFlyerShell } from "@/components/jicf/english-tutoring-flyer";

export const metadata: Metadata = {
  title: "KET PET IELTS Online One-on-One English Tutoring",
  description:
    "Professional one-on-one English tutoring for KET, PET and IELTS with personalized study plans, exam strategy, mock tests and free trial lesson.",
};

export default function EnglishTutoringPage() {
  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-linear-to-b from-[#172554] via-[#0c436a] to-[#172554]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-6">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#fbbf24] mb-2">
              English Tutoring Program
            </p>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              KET · PET · IELTS
            </h1>
            <p className="mt-2 text-sm text-[#ccdce3]/80">
              Online One-on-One English Tutoring
            </p>
          </div>

          <EnglishTutoringFlyerShell />
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
