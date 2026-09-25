import { JsonLd } from "@/components/seo/json-ld";
import { collectionPageLd } from "@/lib/seo/json-ld";
import { prayerFastingMetadata } from "@/lib/seo/public-pages";
import { getSiteUrl } from "@/lib/seo/site-url";
import PrayerFastingClient from "./client";

export default function PrayerFastingPage() {
  const origin = getSiteUrl().origin;

  return (
    <>
      <JsonLd
        data={collectionPageLd({
          origin,
          path: "/prayer-fasting",
          name: "Prayer & fasting",
          description: prayerFastingMetadata.description ?? "",
          crumbs: [
            { name: "Home", url: `${origin}/` },
            { name: "Prayer & fasting", url: `${origin}/prayer-fasting` },
          ],
        })}
      />
      <PrayerFastingClient />
    </>
  );
}
