import type { Metadata } from "next";
import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";
import { SportsDayFlyerShell } from "@/components/jicf/sports-day-flyer";

export const metadata: Metadata = {
  title: "JICF Sports Day 2026 — Jinan International Christian Fellowship",
  description:
    "Join us for JICF Sports Day on Sunday, May 17, 2026 — an afternoon of fun games, fellowship, and recreation together.",
  openGraph: {
    title: "JICF Sports Day — May 17, 2026",
    description:
      "Sports and games for everyone. Come as you are, bring a friend!",
    images: [{ url: "/jicf/outdoor-field.png" }],
  },
};

export default function SportsDayPage() {
  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-linear-to-b from-[#172554] via-[#0c436a] to-[#172554]">
        {/* Page heading */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-2 text-center">
          <p className="text-[#2596be] text-xs font-bold uppercase tracking-[0.22em] mb-2">
            JICF · Jinan International Christian Fellowship
          </p>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Sports Day 2026
          </h1>
          <p className="mt-2 text-[#ccdce3] text-sm">
            JICF Sports Day · Fun Games &amp; Fellowship
          </p>
          <div className="mt-4 h-px bg-white/10 mx-auto max-w-xs" />
        </div>

        {/* Flyer shell */}
        <SportsDayFlyerShell />
      </main>

      <PublicFooter />
    </>
  );
}
