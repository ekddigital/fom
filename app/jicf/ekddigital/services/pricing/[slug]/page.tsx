import { notFound } from "next/navigation";
import {
  buildFlyerMetadata,
  EKDDigitalFlyerPageLayout,
} from "@/components/jicf/ekddigital-flyer-page-layout";
import { EKDDigitalPricingNavLinks } from "@/components/jicf/ekddigital-flyer-nav-links";
import { EKDDigitalServicePricingFlyer } from "@/components/jicf/ekddigital-pricing-flyer";
import {
  ALL_SERVICE_PRICING_CONFIGS,
  getPricingConfigBySlug,
} from "@/components/jicf/ekddigital-pricing-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ALL_SERVICE_PRICING_CONFIGS.map((config) => ({
    slug: config.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const config = getPricingConfigBySlug(slug);
  if (!config) return { title: "EKD Digital — Pricing" };
  return buildFlyerMetadata(config.metadataTitle, config.metadataDescription);
}

export default async function EKDDigitalServicePricingPage({ params }: PageProps) {
  const { slug } = await params;
  const config = getPricingConfigBySlug(slug);
  if (!config) notFound();

  return (
    <EKDDigitalFlyerPageLayout
      eyebrow="EKD Digital Pricing"
      title={config.title}
      subtitle={config.subtitle}
      links={<EKDDigitalPricingNavLinks currentSlug={slug} />}
    >
      <EKDDigitalServicePricingFlyer config={config} />
    </EKDDigitalFlyerPageLayout>
  );
}
