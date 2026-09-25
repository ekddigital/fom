/**
 * Canonical origin for metadata, sitemap, robots, JSON-LD.
 *
 * Fishers of Men public SEO is www-only: https://www.fomjesus.org
 * Launchpad and child builds can inherit a platform NEXTAUTH_URL pointing at
 * an LPAD host. Those must never appear in robots, sitemap, rel=canonical,
 * or og:url.
 */

export const CANONICAL_ORIGIN = "https://www.fomjesus.org";
export const CANONICAL_HOST = "www.fomjesus.org";
export const APEX_HOST = "fomjesus.org";
const DEV_ORIGIN = "http://localhost:3000";

function parseOrigin(raw: string | undefined): URL | null {
  if (!raw?.trim()) return null;
  try {
    const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
    url.pathname = "/";
    url.search = "";
    url.hash = "";
    url.username = "";
    url.password = "";
    return url;
  } catch {
    return null;
  }
}

function hostnameOf(url: URL): string {
  return url.hostname.trim().toLowerCase().replace(/\.$/, "");
}

function isLoopbackHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname === "::1"
  );
}

/** Platform dashboard and `{slug|preview}.lpad.*.com`. */
export function isLaunchpadHost(hostname: string): boolean {
  const host = hostname.trim().toLowerCase().replace(/\.$/, "");
  return (
    host === "lpad.ekddigital.com" ||
    host.endsWith(".lpad.ekddigital.com") ||
    host === "lpad.andgroupco.com" ||
    host.endsWith(".lpad.andgroupco.com") ||
    host.startsWith("lpad.") ||
    host.includes(".lpad.")
  );
}

function isSisterProductHost(hostname: string): boolean {
  const host = hostname.trim().toLowerCase().replace(/\.$/, "");
  if (host === CANONICAL_HOST || host === APEX_HOST) return false;
  return (
    host === "andgroupco.com" ||
    host === "www.andgroupco.com" ||
    host === "ekddigital.com" ||
    host === "www.ekddigital.com" ||
    host.endsWith(".andgroupco.com") ||
    host.endsWith(".ekddigital.com")
  );
}

function normalizeCandidate(url: URL): URL {
  const host = hostnameOf(url);
  if (host === APEX_HOST) {
    url.hostname = CANONICAL_HOST;
  }
  if (hostnameOf(url) === CANONICAL_HOST) {
    url.protocol = "https:";
    url.port = "";
  }
  return url;
}

function isPublicWww(url: URL): boolean {
  return hostnameOf(url) === CANONICAL_HOST && url.protocol === "https:";
}

/**
 * Env wins only when it already is the public www origin (after apex → www).
 * Reads `NEXTAUTH_URL`, the site URL this repo already used before SEO.
 */
function officialFromEnv(raws: Array<string | undefined>): URL | null {
  for (const raw of raws) {
    const parsed = parseOrigin(raw);
    if (!parsed) continue;
    const normalized = normalizeCandidate(parsed);
    const host = hostnameOf(normalized);
    if (isLaunchpadHost(host)) continue;
    if (isLoopbackHost(host)) continue;
    if (isSisterProductHost(host)) continue;
    if (isPublicWww(normalized)) return new URL(CANONICAL_ORIGIN);
  }
  return null;
}

/**
 * Public SEO origin.
 *
 * Reads `NEXTAUTH_URL` only — no new SEO env names. Accepts it only when it
 * already is https://www.fomjesus.org (apex is normalized to www). Launchpad,
 * sister-product, and localhost values are ignored. Production fallback is
 * the official www origin.
 */
export function getSiteUrl(): URL {
  const fromEnv = officialFromEnv([process.env.NEXTAUTH_URL]);
  if (fromEnv) return fromEnv;

  if (process.env.NODE_ENV !== "production") {
    const local = parseOrigin(process.env.NEXTAUTH_URL ?? DEV_ORIGIN);
    if (local && isLoopbackHost(hostnameOf(local))) return local;
    return new URL(DEV_ORIGIN);
  }

  return new URL(CANONICAL_ORIGIN);
}

export function absoluteUrl(path = "/"): string {
  const origin = getSiteUrl();
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = !path
    ? "/"
    : path.startsWith("/")
      ? path
      : `/${path}`;
  return new URL(normalized, origin).toString();
}

export function requestHostname(hostHeader: string | null, fallback: string): string {
  const raw = (hostHeader?.split(",")[0] || fallback).trim().toLowerCase();
  return raw.split(":")[0]?.replace(/\.$/, "") ?? fallback;
}
