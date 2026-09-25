import { JsonLd } from "@/components/seo/json-ld";
import { aboutPageLd } from "@/lib/seo/json-ld";
import { aboutMetadata } from "@/lib/seo/public-pages";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata = aboutMetadata;

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const origin = getSiteUrl().origin;
  return (
    <>
      <JsonLd
        data={aboutPageLd({
          origin,
          description: aboutMetadata.description ?? "",
        })}
      />
      {children}
    </>
  );
}
