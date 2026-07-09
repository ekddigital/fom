import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";
import {
  ALL_SERVICE_PRICING_CONFIGS,
  pricingFlyerHref,
} from "@/components/jicf/ekddigital-pricing-data";
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

      <main className="min-h-screen bg-linear-to-b from-[#172554] via-[#0c436a] to-[#172554]">
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

        {/* Event cards */}
        <div className="mx-auto max-w-4xl px-6 pb-16">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-[#2596be]/80">
            Upcoming Events
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/jicf/fom-conference"
              className="group block rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-[#b8c0cc]/50 transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden bg-linear-to-br from-[#060d1f] via-[#0c1a3a] to-[#132a52] p-5 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Logo.png"
                  alt="Fishers of Men"
                  className="h-28 w-28 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#060d1f]/90 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="rounded-full bg-[#b8c0cc]/15 border border-[#b8c0cc]/45 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#d4dae3]">
                    FOM Conference
                  </span>
                </div>
              </div>

              <div className="bg-[#060d1f]/95 px-6 py-5 backdrop-blur-sm border-t border-[#b8c0cc]/15">
                <h2 className="text-xl font-black text-white mb-1">
                  Fishers of Men Conference
                </h2>
                <p className="text-[#d4dae3]/70 text-xs mb-4 italic">
                  Teaching, worship, fellowship &amp; all-night gathering
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-[#b8c0cc]" />
                    May 22–24, 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-[#b8c0cc]" />
                    Multi-day schedule
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-[#b8c0cc]" />
                    Thompson&apos;s Place (Fri night)
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-1 text-[#d4dae3] text-sm font-semibold group-hover:gap-2 transition-all">
                  View Flyer
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </Link>

            <Link
              href="/jicf/sports-day"
              className="group block rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-[#2596be]/50 transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/jicf/outdoor-field.png"
                  alt="Sports field"
                  className="h-full w-full object-cover object-center brightness-75 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#172554]/90 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="rounded-full bg-[#2596be]/20 border border-[#2596be]/50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#2596be]">
                    Sports Day
                  </span>
                </div>
              </div>

              <div className="bg-[#172554]/90 px-6 py-5 backdrop-blur-sm">
                <h2 className="text-xl font-black text-white mb-1">
                  JICF Sports Day
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

            <Link
              href="/jicf/graduates-celebration"
              className="group block rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-[#fbbf24]/50 transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/jicf/graduates.png"
                  alt="Graduates celebration"
                  className="h-full w-full object-cover object-center brightness-75 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#172554]/90 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="rounded-full bg-[#fbbf24]/15 border border-[#fbbf24]/45 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#fbbf24]">
                    Graduates 2026
                  </span>
                </div>
              </div>

              <div className="bg-[#172554]/90 px-6 py-5 backdrop-blur-sm">
                <h2 className="text-xl font-black text-white mb-1">
                  Graduates Service, Celebration &amp; Dinner
                </h2>
                <p className="text-[#ccdce3]/70 text-xs mb-4 italic">
                  Celebrating all graduates of 2026
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-[#fbbf24]" />
                    Sunday, June 14, 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-[#fbbf24]" />
                    14:30 - 17:00
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-[#fbbf24]" />
                    Dinner after service
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-1 text-[#fbbf24] text-sm font-semibold group-hover:gap-2 transition-all">
                  View Flyer
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </Link>

            <Link
              href="/jicf/english-tutoring"
              className="group block rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-[#fbbf24]/50 transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden bg-linear-to-br from-[#0b3a62] via-[#0c436a] to-[#172554] p-5">
                <div className="h-full w-full border border-[#fbbf24]/25 rounded-xl p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#cbd5e1] font-bold">
                    Online Tutoring
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-white leading-none">
                    KET · PET
                    <br />
                    IELTS
                  </h3>
                  <p className="mt-2 text-xs text-[#fbbf24] font-semibold">
                    One-on-One English Prep
                  </p>
                  <div className="mt-3 rounded-lg bg-white/95 px-2 py-1.5 w-fit">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/ielts_logo.png"
                      alt="IELTS"
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#172554]/90 px-6 py-5 backdrop-blur-sm">
                <h2 className="text-xl font-black text-white mb-1">
                  KET PET IELTS Tutoring
                </h2>
                <p className="text-[#ccdce3]/70 text-xs mb-4">
                  Personalized exam preparation with free trial assessment
                  lesson
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-[#fbbf24]" />
                    Weekday evenings / weekends
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-[#fbbf24]" />
                    Online One-on-One
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-1 text-[#fbbf24] text-sm font-semibold group-hover:gap-2 transition-all">
                  View Flyer
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </Link>

            <Link
              href="/jicf/ekddigital"
              className="group block rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-[#C9972E]/50 transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/jicf/ekddigital.png"
                  alt="EKDDigital"
                  className="h-full w-full object-cover object-center brightness-75 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#172554]/90 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="rounded-full bg-[#C99724]/15 border border-[#C99724]/45 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#C99724]">
                    EKDDigital
                  </span>
                </div>
              </div>

              <div className="bg-[#172554]/90 px-6 py-5 backdrop-blur-sm">
                <h2 className="text-xl font-black text-white mb-1">
                  EKDDigital
                </h2>
                <p className="text-[#ccdce3]/70 text-xs mb-4">
                  Academic Writing · App Development · Technical Services
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-[#C9972E]" />
                    Weekday evenings / weekends
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-[#C9972E]" />
                    Online One-on-One
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-1 text-[#C9972E] text-sm font-semibold group-hover:gap-2 transition-all">
                  View Flyer
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </Link>

            <Link
              href="/jicf/ekddigital/services"
              className="group block rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-[#C9972E]/50 transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden bg-linear-to-br from-[#07090f] via-[#0c1221] to-[#07090f] p-5">
                <div className="h-full w-full border border-[#C9972E]/30 rounded-xl p-4 flex flex-col justify-between">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#e6c258] font-bold">
                    Cloud &amp; Software
                  </p>
                  <div>
                    <h3 className="text-xl font-black text-white leading-tight">
                      Build · Host · Scale
                    </h3>
                    <p className="mt-1 text-xs text-[#9ca3af] font-medium">
                      EKDSend · Assets · SSL · Email · Hosting
                    </p>
                  </div>
                  <p className="text-[10px] text-[#C9972E] font-bold uppercase tracking-widest">
                    EKD Digital
                  </p>
                </div>
              </div>

              <div className="bg-[#07090f]/95 px-6 py-5 backdrop-blur-sm border-t border-[#C9972E]/20">
                <h2 className="text-xl font-black text-white mb-1">
                  EKD Digital Cloud
                </h2>
                <p className="text-[#9ca3af]/90 text-xs mb-4">
                  Software Development · Cloud Services · Communications APIs
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-[#C9972E]" />
                    Enterprise-ready platforms
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-[#C9972E]" />
                    Global CDN &amp; APIs
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-1 text-[#C9972E] text-sm font-semibold group-hover:gap-2 transition-all">
                  View Flyer
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </Link>
          </div>

          <EkddigitalPricingHubSection />

        </div>
      </main>

      <PublicFooter />
    </>
  );
}

function EkddigitalPricingHubSection() {
  return (
    <div className="mt-10">
      <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-[#C9972E]/80">
        EKD Digital — Service Pricing Flyers
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/jicf/ekddigital/ekdsend"
          className="group flex items-center justify-between rounded-xl border border-[#C8A061]/35 bg-[#1F1C18]/80 px-4 py-3 hover:border-[#C8A061]/55 transition-colors sm:col-span-2 lg:col-span-3"
        >
          <div>
            <p className="text-sm font-bold text-white">EKDSend — Promotional Flyer</p>
            <p className="text-xs text-[#a8a29e]">
              Communications that deliver · es.ekddigital.com
            </p>
          </div>
          <ArrowRight className="size-4 text-[#C8A061] shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </Link>
        {ALL_SERVICE_PRICING_CONFIGS.map((config) => (
          <Link
            key={config.slug}
            href={pricingFlyerHref(config.slug)}
            className="group flex items-center justify-between rounded-xl border border-[#C9972E]/25 bg-[#07090f]/80 px-4 py-3 hover:border-[#C9972E]/50 transition-colors"
          >
            <div>
              <p className="text-sm font-bold text-white">{config.title}</p>
              <p className="text-xs text-[#9ca3af]">{config.subtitle}</p>
            </div>
            <ArrowRight className="size-4 text-[#C9972E] shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-[#9ca3af]/80">
        <Link
          href="/jicf/ekddigital/services"
          className="text-[#C9972E] font-semibold hover:underline"
        >
          Services overview
        </Link>
        {" · "}
        each service has its own pricing flyer
      </p>
    </div>
  );
}
