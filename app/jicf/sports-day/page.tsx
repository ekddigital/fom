import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";
import { SportsDayFlyerShell } from "@/components/jicf/sports-day-flyer";
import { JsonLd } from "@/components/seo/json-ld";
import { eventLd } from "@/lib/seo/json-ld";
import { OG_IMAGES } from "@/lib/seo/og-images";
import { sportsDayMetadata } from "@/lib/seo/public-pages";
import { absoluteUrl, getSiteUrl } from "@/lib/seo/site-url";

export const metadata = sportsDayMetadata;

export default function SportsDayPage() {
  const origin = getSiteUrl().origin;

  return (
    <>
      <JsonLd
        data={eventLd({
          origin,
          url: absoluteUrl("/jicf/sports-day"),
          name: "JICF Sports Day 2026",
          description: sportsDayMetadata.description ?? "",
          image: absoluteUrl(OG_IMAGES.sportsDay),
          startDate: "2026-05-17",
          endDate: "2026-05-17",
          locationName: "Jinan International Christian Fellowship",
        })}
      />
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
