import { JsonLd } from "@/components/seo/json-ld";
import { webPageLd } from "@/lib/seo/json-ld";
import { giveMetadata } from "@/lib/seo/public-pages";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata = giveMetadata;

export default function GiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const origin = getSiteUrl().origin;
  return (
    <>
      <JsonLd
        data={webPageLd({
          origin,
          path: "/give",
          name: "Give",
          description: giveMetadata.description ?? "",
          crumbs: [
            { name: "Home", url: `${origin}/` },
            { name: "Give", url: `${origin}/give` },
          ],
        })}
      />
      {children}
    </>
  );
}
