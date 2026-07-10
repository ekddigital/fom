import Link from "next/link";
import {
  ALL_SERVICE_PRICING_CONFIGS,
  PRICING_ROUTE_PREFIX,
} from "@/components/jicf/ekddigital-pricing-data";

const linkClass =
  "rounded-full border border-[#C8A061]/40 px-3 py-1.5 text-xs font-semibold text-[#E8C589] hover:bg-[#C8A061]/10 transition-colors";

export function EKDDigitalOverviewNavLinks() {
  return (
  <>
      <Link href="/jicf/ekddigital/ekdsend" className={linkClass}>
        EKDSend promo
      </Link>
      <Link href="/jicf/ekddigital/digital-assets" className={linkClass}>
        Digital Assets promo
      </Link>
      <Link href="/jicf/ekddigital/services" className={linkClass}>
        Services overview
      </Link>
      <Link href="/jicf" className={linkClass}>
        JICF hub
      </Link>
    </>
  );
}

export function EKDSendPromoNavLinks() {
  return (
    <>
      <Link href="/jicf/ekddigital/services" className={linkClass}>
        All services
      </Link>
      <Link href="/jicf/ekddigital/digital-assets" className={linkClass}>
        Digital Assets promo
      </Link>
      <Link href={PRICING_ROUTE_PREFIX + "/ekdsend"} className={linkClass}>
        EKDSend pricing
      </Link>
      <Link href="/jicf" className={linkClass}>
        JICF hub
      </Link>
    </>
  );
}

export function EKDDigitalAssetsPromoNavLinks() {
  return (
    <>
      <Link href="/jicf/ekddigital/services" className={linkClass}>
        All services
      </Link>
      <Link href={PRICING_ROUTE_PREFIX + "/digital-assets"} className={linkClass}>
        Digital Assets pricing
      </Link>
      <Link href="/jicf/ekddigital/ekdsend" className={linkClass}>
        EKDSend promo
      </Link>
      <Link href="/jicf" className={linkClass}>
        JICF hub
      </Link>
    </>
  );
}

export function EKDDigitalPricingNavLinks({ currentSlug }: { currentSlug: string }) {
  return (
    <>
      <Link href="/jicf/ekddigital/services" className={linkClass}>
        All services
      </Link>
      {ALL_SERVICE_PRICING_CONFIGS.map((config) => (
        <Link
          key={config.slug}
          href={`${PRICING_ROUTE_PREFIX}/${config.slug}`}
          className={`${linkClass}${
            config.slug === currentSlug ? " bg-[#C8A061]/20 border-[#C8A061]" : ""
          }`}
          aria-current={config.slug === currentSlug ? "page" : undefined}
        >
          {config.title}
        </Link>
      ))}
    </>
  );
}
