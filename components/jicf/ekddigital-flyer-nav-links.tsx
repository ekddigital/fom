import Link from "next/link";
import {
  ALL_SERVICE_PRICING_CONFIGS,
  PRICING_ROUTE_PREFIX,
} from "@/components/jicf/ekddigital-pricing-data";

const linkClass =
  "rounded-full border border-[#C9972E]/40 px-3 py-1.5 text-xs font-semibold text-[#e6c258] hover:bg-[#C9972E]/10 transition-colors";

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
            config.slug === currentSlug ? " bg-[#C9972E]/20 border-[#C9972E]" : ""
          }`}
          aria-current={config.slug === currentSlug ? "page" : undefined}
        >
          {config.title}
        </Link>
      ))}
    </>
  );
}
