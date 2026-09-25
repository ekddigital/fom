import { JsonLd } from "@/components/seo/json-ld";
import { contactPageLd } from "@/lib/seo/json-ld";
import { contactMetadata } from "@/lib/seo/public-pages";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata = contactMetadata;

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const origin = getSiteUrl().origin;
  return (
    <>
      <JsonLd
        data={contactPageLd({
          origin,
          description: contactMetadata.description ?? "",
        })}
      />
      {children}
    </>
  );
}
