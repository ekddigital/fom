import type { Metadata } from "next";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "./constants";
import { OG_IMAGES } from "./og-images";
import { pageMetadata } from "./page-metadata";

export const homeMetadata: Metadata = pageMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: DEFAULT_DESCRIPTION,
  path: "/",
  image: OG_IMAGES.default,
  imageAlt: `${SITE_NAME} — ${SITE_TAGLINE}`,
  absoluteTitle: true,
});

export const aboutMetadata: Metadata = pageMetadata({
  title: "About us",
  description:
    "Learn how Fishers of Men began in 2019, our covenant from 2 Kings 6:16, and how we preach the gospel through ministry, missions, and fellowship.",
  path: "/about",
  image: OG_IMAGES.about,
  imageAlt: `About ${SITE_NAME}`,
});

export const eventsMetadata: Metadata = pageMetadata({
  title: "Events",
  description:
    "Worship services, Bible studies, outreach, and special gatherings from Fishers of Men. Join us for teaching, prayer, and community.",
  path: "/events",
  image: OG_IMAGES.events,
  imageAlt: `${SITE_NAME} events`,
});

export const giveMetadata: Metadata = pageMetadata({
  title: "Give",
  description:
    "Support Fishers of Men missions, local outreach, teaching, and ministry work. Give online or learn how your gift advances the gospel.",
  path: "/give",
  image: OG_IMAGES.give,
  imageAlt: `Give to ${SITE_NAME}`,
});

export const contactMetadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Fishers of Men for prayer, pastoral care, ministry questions, or partnership. Reach the team by email or the form on this page.",
  path: "/contact",
  image: OG_IMAGES.contact,
  imageAlt: `Contact ${SITE_NAME}`,
});

export const prayerFastingMetadata: Metadata = pageMetadata({
  title: "Prayer & fasting",
  description:
    "Monthly prayer and fasting sessions from Fishers of Men — teaching, worship, and intercession you can watch, study, and share.",
  path: "/prayer-fasting",
  image: OG_IMAGES.prayerFasting,
  imageAlt: `${SITE_NAME} prayer and fasting`,
});

export const jicfMetadata: Metadata = pageMetadata({
  title: "Jinan International Christian Fellowship",
  description:
    "Jinan International Christian Fellowship (JICF) is an English-speaking Christian community in Jinan, China, in fellowship with Fishers of Men.",
  path: "/jicf",
  image: OG_IMAGES.jicf,
  imageAlt: "Jinan International Christian Fellowship",
});

export const conferenceMetadata: Metadata = pageMetadata({
  title: "FOM Conference 2026",
  description:
    "Fishers of Men Conference, May 22–24, 2026 — teaching sessions, all-night fellowship at Thompson's Place, and Sunday games.",
  path: "/jicf/fom-conference",
  image: OG_IMAGES.conference,
  imageAlt: "Fishers of Men Conference 2026",
});

export const sportsDayMetadata: Metadata = pageMetadata({
  title: "JICF Sports Day 2026",
  description:
    "JICF Sports Day on Sunday, May 17, 2026 — an afternoon of games, fellowship, and recreation with Jinan International Christian Fellowship.",
  path: "/jicf/sports-day",
  image: OG_IMAGES.sportsDay,
  imageAlt: "JICF Sports Day 2026",
});

export const graduatesMetadata: Metadata = pageMetadata({
  title: "JICF Graduates Celebration 2026",
  description:
    "JICF Graduates Service, Celebration & Dinner on Sunday, June 14, 2026. Service from 14:30 to 17:00, dinner after service.",
  path: "/jicf/graduates-celebration",
  image: OG_IMAGES.graduates,
  imageAlt: "JICF Graduates Celebration 2026",
});

/** Thin placeholders — crawlable but not indexable until real content ships. */
export const sermonsPlaceholderMetadata: Metadata = pageMetadata({
  title: "Sermons",
  description:
    "Sermon recordings from Fishers of Men will be published here. This page is a placeholder until the library is ready.",
  path: "/sermons",
  index: false,
});

export const bibleStudiesPlaceholderMetadata: Metadata = pageMetadata({
  title: "Bible studies",
  description:
    "Bible study groups from Fishers of Men will be listed here. This page is a placeholder until registrations are live.",
  path: "/bible-studies",
  index: false,
});

export const devotionalsPlaceholderMetadata: Metadata = pageMetadata({
  title: "Devotionals",
  description:
    "Daily devotionals from Fishers of Men will be published here. This page is a placeholder until writing is ready.",
  path: "/devotionals",
  index: false,
});

export const testimoniesPlaceholderMetadata: Metadata = pageMetadata({
  title: "Testimonies",
  description:
    "Member testimonies from Fishers of Men will be published here. This page is a placeholder until stories are ready.",
  path: "/testimonies",
  index: false,
});

export const missionReportsPlaceholderMetadata: Metadata = pageMetadata({
  title: "Mission reports",
  description:
    "Mission trip reports from Fishers of Men will be published here. This page is a placeholder until field reports ship.",
  path: "/mission-reports",
  index: false,
});

export const resourcesPlaceholderMetadata: Metadata = pageMetadata({
  title: "Resources library",
  description:
    "Study guides and ministry resources from Fishers of Men will be published here. This page is a placeholder until downloads are ready.",
  path: "/resources",
  index: false,
});

export const studyPlaceholderMetadata: Metadata = pageMetadata({
  title: "Study programs",
  description:
    "Structured study programs from Fishers of Men will be listed here. This page is a placeholder until enrollment is ready.",
  path: "/study",
  index: false,
});

export const englishTutoringMetadata: Metadata = pageMetadata({
  title: "KET PET IELTS English tutoring",
  description:
    "One-on-one English tutoring for KET, PET, and IELTS. This flyer is a share page and is not part of the public Fishers of Men index.",
  path: "/jicf/english-tutoring",
  index: false,
});
