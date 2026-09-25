/**
 * JSON-LD builders. Render with <JsonLd /> from components/seo/json-ld.tsx.
 * Match visible page content only. Absolute HTTPS URLs. Stable @ids.
 */

import { FOM_BRAND } from "@/lib/constants/fom";
import { LEGAL_NAME, LOGO_PATH, SITE_NAME, SITE_TAGLINE } from "./constants";
import { absoluteUrl } from "./site-url";

export { LEGAL_NAME, SITE_NAME };

function originOf(origin: string): string {
  return origin.replace(/\/$/, "");
}

export function organizationNode(origin: string) {
  const base = originOf(origin);
  return {
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_TAGLINE,
    url: base,
    logo: absoluteUrl(LOGO_PATH),
    image: absoluteUrl(LOGO_PATH),
    description: FOM_BRAND.mission,
    foundingDate: String(FOM_BRAND.foundedYear),
    parentOrganization: {
      "@type": "Organization",
      name: LEGAL_NAME,
      legalName: LEGAL_NAME,
    },
  };
}

export function organizationGraph(opts: {
  origin: string;
  inLanguage?: string;
}) {
  const origin = originOf(opts.origin);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(origin),
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: SITE_NAME,
        url: `${origin}/`,
        description: `${SITE_NAME} — ${SITE_TAGLINE}`,
        publisher: { "@id": `${origin}/#organization` },
        inLanguage: opts.inLanguage ?? "en",
      },
    ],
  };
}

export function aboutPageLd(opts: { origin: string; description: string }) {
  const origin = originOf(opts.origin);
  const url = `${origin}/about`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${url}#webpage`,
        url,
        name: `About ${SITE_NAME}`,
        description: opts.description,
        isPartOf: { "@id": `${origin}/#website` },
        about: { "@id": `${origin}/#organization` },
        inLanguage: "en",
      },
      breadcrumbLd([
        { name: "Home", url: `${origin}/` },
        { name: "About", url },
      ]),
    ],
  };
}

export function contactPageLd(opts: { origin: string; description: string }) {
  const origin = originOf(opts.origin);
  const url = `${origin}/contact`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${url}#webpage`,
        url,
        name: `Contact ${SITE_NAME}`,
        description: opts.description,
        isPartOf: { "@id": `${origin}/#website` },
        mainEntity: { "@id": `${origin}/#organization` },
        inLanguage: "en",
      },
      breadcrumbLd([
        { name: "Home", url: `${origin}/` },
        { name: "Contact", url },
      ]),
    ],
  };
}

export function webPageLd(opts: {
  origin: string;
  path: string;
  name: string;
  description: string;
  crumbs: { name: string; url?: string }[];
}) {
  const origin = originOf(opts.origin);
  const url = `${origin}${opts.path === "/" ? "/" : opts.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: opts.name,
        description: opts.description,
        isPartOf: { "@id": `${origin}/#website` },
        about: { "@id": `${origin}/#organization` },
        inLanguage: "en",
      },
      breadcrumbLd(opts.crumbs),
    ],
  };
}

export function collectionPageLd(opts: {
  origin: string;
  path: string;
  name: string;
  description: string;
  crumbs: { name: string; url?: string }[];
}) {
  const origin = originOf(opts.origin);
  const url = `${origin}${opts.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: opts.name,
        description: opts.description,
        isPartOf: { "@id": `${origin}/#website` },
        inLanguage: "en",
      },
      breadcrumbLd(opts.crumbs),
    ],
  };
}

export function articleLd(opts: {
  origin: string;
  url: string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) {
  const origin = originOf(opts.origin);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    image: [opts.image],
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { "@type": "Person", name: opts.authorName },
    publisher: { "@id": `${origin}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
  };
}

export function eventLd(opts: {
  origin: string;
  url: string;
  name: string;
  description: string;
  image: string;
  /** ISO-8601 date or datetime with offset when a clock time is visible. */
  startDate: string;
  endDate: string;
  locationName?: string;
  online?: boolean;
  inLanguage?: string;
}) {
  const origin = originOf(opts.origin);
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: opts.name,
    url: opts.url,
    description: opts.description,
    image: [opts.image],
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: opts.online
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    startDate: opts.startDate,
    endDate: opts.endDate,
    location: opts.online
      ? { "@type": "VirtualLocation", url: opts.url }
      : {
          "@type": "Place",
          name: opts.locationName ?? SITE_NAME,
        },
    organizer: {
      "@type": "Organization",
      "@id": `${origin}/#organization`,
    },
    inLanguage: opts.inLanguage ?? "en",
  };
}

export function breadcrumbLd(crumbs: { name: string; url?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.url ? { item: c.url } : {}),
    })),
  };
}
