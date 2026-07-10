import Link from "next/link";
import {
  buildFlyerMetadata,
  EKDDigitalFlyerPageLayout,
} from "@/components/jicf/ekddigital-flyer-page-layout";
import { EKDDigitalAssetsFlyerShell } from "@/components/jicf/ekd-digital-assets-flyer";
import { EKDDigitalAssetsPromoNavLinks } from "@/components/jicf/ekddigital-flyer-nav-links";
import { pricingFlyerHref } from "@/components/jicf/ekddigital-pricing-data";

export const metadata = buildFlyerMetadata(
  "EKD Digital Assets — Your Assets. Secured.",
  "Digital Assets promotional flyer: secure DAM with global CDN delivery. WhatsApp +86 185 0683 2159 · WeChat EKD231777285010 · assets.andgroupco.com",
);

const relatedLinkClass =
  "rounded-lg border border-[#C8A061]/35 bg-[#1F1C18]/80 px-4 py-3 text-left hover:border-[#C8A061]/60 transition-colors block";

export default function EKDDigitalAssetsPromoFlyerPage() {
  return (
    <EKDDigitalFlyerPageLayout
      eyebrow="Digital Assets Promotional Flyer"
      title="Your Assets. Secured."
      subtitle="DAM · CDN hosting · REST API — enterprise-ready asset management"
      links={<EKDDigitalAssetsPromoNavLinks />}
    >
      <EKDDigitalAssetsFlyerShell />

      <div className="mt-8 print:hidden max-w-lg mx-auto space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-[#C8A061] text-center mb-3">
          Related flyers
        </p>
        <Link
          href={pricingFlyerHref("digital-assets")}
          className={relatedLinkClass}
        >
          <span className="text-sm font-bold text-white">Digital Assets Pricing</span>
          <span className="block text-xs text-[#a8a29e] mt-0.5">
            Storage plans · CDN tiers
          </span>
        </Link>
        <Link href="/jicf/ekddigital/ekdsend" className={relatedLinkClass}>
          <span className="text-sm font-bold text-white">EKDSend</span>
          <span className="block text-xs text-[#a8a29e] mt-0.5">
            Communications platform promotional flyer
          </span>
        </Link>
        <Link href="/jicf/ekddigital/services" className={relatedLinkClass}>
          <span className="text-sm font-bold text-white">EKD Digital Services</span>
          <span className="block text-xs text-[#a8a29e] mt-0.5">
            Cloud &amp; software overview flyer
          </span>
        </Link>
      </div>
    </EKDDigitalFlyerPageLayout>
  );
}
