import { JsonLd } from "@/components/seo/json-ld";
import { collectionPageLd } from "@/lib/seo/json-ld";
import { eventsMetadata } from "@/lib/seo/public-pages";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata = eventsMetadata;

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const origin = getSiteUrl().origin;
  return (
    <>
      <JsonLd
        data={collectionPageLd({
          origin,
          path: "/events",
          name: "Events",
          description: eventsMetadata.description ?? "",
          crumbs: [
            { name: "Home", url: `${origin}/` },
            { name: "Events", url: `${origin}/events` },
          ],
        })}
      />
      {children}
    </>
  );
}
