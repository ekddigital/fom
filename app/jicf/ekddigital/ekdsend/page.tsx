import Link from "next/link";
import {
  buildFlyerMetadata,
  EKDDigitalFlyerPageLayout,
} from "@/components/jicf/ekddigital-flyer-page-layout";
import { EKDSendFlyerShell } from "@/components/jicf/ekdsend-flyer";
import { EKDSendPromoNavLinks } from "@/components/jicf/ekddigital-flyer-nav-links";
import { pricingFlyerHref } from "@/components/jicf/ekddigital-pricing-data";

export const metadata = buildFlyerMetadata(
  "EKDSend — Communications That Deliver",
  "EKDSend promotional flyer: transactional email, SMS, and voice on one reliable platform. Free tier available at es.ekddigital.com.",
);

const relatedLinkClass =
  "rounded-lg border border-[#C8A061]/35 bg-[#1F1C18]/80 px-4 py-3 text-left hover:border-[#C8A061]/60 transition-colors block";

export default function EKDSendPromoFlyerPage() {
  return (
    <EKDDigitalFlyerPageLayout
      eyebrow="EKDSend Promotional Flyer"
      title="Communications That Deliver"
      subtitle="Email · SMS · Voice — one platform built for reliability and control"
      links={<EKDSendPromoNavLinks />}
    >
      <EKDSendFlyerShell />

      <div className="mt-8 print:hidden max-w-lg mx-auto space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-[#C8A061] text-center mb-3">
          Related flyers
        </p>
        <Link href={pricingFlyerHref("ekdsend")} className={relatedLinkClass}>
          <span className="text-sm font-bold text-white">EKDSend Pricing</span>
          <span className="block text-xs text-[#a8a29e] mt-0.5">
            SMS · Voice · Messaging API plans
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
