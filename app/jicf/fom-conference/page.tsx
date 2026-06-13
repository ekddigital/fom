import type { Metadata } from "next";
import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";
import { FOMConferenceFlyerShell } from "@/components/jicf/fom-conference-flyer";
import { FOM_BRAND, FOM_LOGO } from "@/lib/constants/fom";

export const metadata: Metadata = {
  title: "FOM Conference 2026 — Fishers of Men",
  description:
    "Fishers of Men Conference — May 22–24, 2026. Sessions, all-night fellowship at Thompson's Place, and Sunday games & fellowship.",
  openGraph: {
    title: "FOM Conference — May 22–24, 2026",
    description:
      "Join Fishers of Men for three days of teaching, worship, and fellowship.",
    images: [{ url: FOM_LOGO.png, alt: FOM_LOGO.alt }],
  },
};

export default function FOMConferencePage() {
  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-linear-to-b from-[#060d1f] via-[#0c1a3a] to-[#132a52]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-6">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#b8c0cc] mb-2">
              {FOM_BRAND.name}
            </p>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              FOM Conference 2026
            </h1>
            <p className="mt-2 text-sm text-[#d4dae3]/85">
              May 22–24, 2026 · Sessions · All-night fellowship · Sunday games
            </p>
          </div>

          <FOMConferenceFlyerShell />
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
