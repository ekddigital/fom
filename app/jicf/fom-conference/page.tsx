import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";
import { FOMConferenceFlyerShell } from "@/components/jicf/fom-conference-flyer";
import { FOM_BRAND } from "@/lib/constants/fom";
import { JsonLd } from "@/components/seo/json-ld";
import { eventLd } from "@/lib/seo/json-ld";
import { OG_IMAGES } from "@/lib/seo/og-images";
import { conferenceMetadata } from "@/lib/seo/public-pages";
import { absoluteUrl, getSiteUrl } from "@/lib/seo/site-url";

export const metadata = conferenceMetadata;

export default function FOMConferencePage() {
  const origin = getSiteUrl().origin;

  return (
    <>
      <JsonLd
        data={eventLd({
          origin,
          url: absoluteUrl("/jicf/fom-conference"),
          name: "FOM Conference 2026",
          description: conferenceMetadata.description ?? "",
          image: absoluteUrl(OG_IMAGES.conference),
          startDate: "2026-05-22",
          endDate: "2026-05-24",
          locationName: "Thompson's Place",
        })}
      />
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
