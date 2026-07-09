import {
  buildFlyerMetadata,
  EKDDigitalFlyerPageLayout,
} from "@/components/jicf/ekddigital-flyer-page-layout";
import { EKDDigitalOverviewNavLinks } from "@/components/jicf/ekddigital-flyer-nav-links";
import { EKDDigitalCloudServicesFlyerShell } from "@/components/jicf/ekddigital-cloud-services-flyer";
import Link from "next/link";
import {
  ALL_SERVICE_PRICING_CONFIGS,
  pricingFlyerHref,
} from "@/components/jicf/ekddigital-pricing-data";

export const metadata = buildFlyerMetadata(
  "EKD Digital — Build · Host · Scale",
  "EKD Digital builds custom software and delivers cloud services: EKDSend communications APIs, digital asset management, SSL certificates, transactional email, and cloud hosting.",
);

const pricingLinkClass =
  "rounded-lg border border-[#C9972E]/35 bg-[#0c1221]/80 px-4 py-3 text-left hover:border-[#C9972E]/60 transition-colors";

export default function EKDDigitalCloudServicesFlyerPage() {
  return (
    <EKDDigitalFlyerPageLayout
      eyebrow="EKD Digital Cloud & Software"
      title="Build · Host · Scale"
      subtitle="Custom Software · EKDSend · Digital Assets · SSL · Transactional Email · Cloud Hosting"
      links={<EKDDigitalOverviewNavLinks />}
    >
      <EKDDigitalCloudServicesFlyerShell />

      <div className="mt-8 print:hidden max-w-lg mx-auto space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-[#C9972E] text-center mb-3">
          Product promotional flyers
        </p>
        <Link href="/jicf/ekddigital/ekdsend" className={`${pricingLinkClass} block`}>
          <span className="text-sm font-bold text-white">EKDSend</span>
          <span className="block text-xs text-[#9ca3af] mt-0.5">
            Communications platform — view promotional flyer
          </span>
        </Link>
        <p className="text-xs font-bold uppercase tracking-widest text-[#C9972E] text-center mb-3 pt-4">
          Service pricing flyers
        </p>
        {ALL_SERVICE_PRICING_CONFIGS.map((config) => (
          <Link
            key={config.slug}
            href={pricingFlyerHref(config.slug)}
            className={`${pricingLinkClass} block`}
          >
            <span className="text-sm font-bold text-white">{config.title}</span>
            <span className="block text-xs text-[#9ca3af] mt-0.5">
              {config.subtitle} — view pricing flyer
            </span>
          </Link>
        ))}
      </div>
    </EKDDigitalFlyerPageLayout>
  );
}
