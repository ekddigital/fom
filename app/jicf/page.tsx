import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "JICF — Jinan International Christian Fellowship",
  description:
    "Jinan International Christian Fellowship (JICF) — a welcoming English-speaking Christian community in Jinan, China.",
};

export default function JICFPage() {
  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-gradient-to-b from-[#172554] via-[#0c436a] to-[#172554]">
        {/* Hero */}
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white p-3 shadow-xl ring-2 ring-[#2596be]/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/JICF_LOGO1.png"
              alt="JICF"
              className="h-full w-full object-contain"
            />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#2596be]">
            JICF
          </p>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Jinan International
            <br />
            Christian Fellowship
          </h1>
          <p className="mt-3 text-[#ccdce3]/80 text-sm max-w-lg mx-auto leading-relaxed">
            A welcoming English-speaking Christian community in Jinan, China. We
            gather to worship, grow in faith, and do life together.
          </p>
          <div className="mt-4 h-px bg-white/10 mx-auto max-w-xs" />
        </div>

        {/* Upcoming event card */}
        <div className="mx-auto max-w-2xl px-6 pb-16">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-[#2596be]/80">
            Upcoming Event
          </p>
          <Link
            href="/jicf/sports-day"
            className="group block rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-[#2596be]/50 transition-all duration-300"
          >
            {/* Event photo banner */}
            <div className="relative h-44 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/jicf/outdoor-field.png"
                alt="Outdoor field"
                className="h-full w-full object-cover object-center brightness-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/90 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <span className="rounded-full bg-[#2596be]/20 border border-[#2596be]/50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#2596be]">
                  Sports Day
                </span>
              </div>
            </div>

            {/* Event info */}
            <div className="bg-[#172554]/90 px-6 py-5 backdrop-blur-sm">
              <h2 className="text-xl font-black text-white mb-1">
                Outdoor Service &amp; Sports Day
              </h2>
              <p className="text-[#ccdce3]/70 text-xs mb-4 italic">
                &ldquo;They will run and not grow weary&rdquo; — Isaiah 40:31
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-[#2596be]" />
                  Sunday, May 17, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-[#2596be]" />
                  14:00
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-[#2596be]" />
                  Venue TBA
                </span>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[#2596be] text-sm font-semibold group-hover:gap-2 transition-all">
                View Flyer
                <ArrowRight className="size-4" />
              </div>
            </div>
          </Link>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
