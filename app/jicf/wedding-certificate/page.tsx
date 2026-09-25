import type { Metadata } from "next";
import { JicfWeddingCertificateShell } from "@/components/jicf/jicf-wedding-certificate-shell";
import { JICF_WEDDING_HARMON_BARVOR } from "@/lib/jicf/wedding-certificate-data";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { dbCertificateService } from "@/lib/services/certificate-database";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "JICF Marriage Certificate",
  description:
    "Official Jinan International Christian Fellowship marriage certificate for Mr. Joshua Bosco Barvor and Miss Ruphine Manaweh Harmon.",
  path: "/jicf/wedding-certificate",
  index: false,
});

export default async function JicfWeddingCertificatePage() {
  await dbCertificateService.ensureJicfWeddingRecord();

  return (
    <div className="mx-auto w-full max-w-[1600px] bg-[#fffef8] px-3 py-6 sm:px-4 lg:px-6">
      <JicfWeddingCertificateShell initialData={JICF_WEDDING_HARMON_BARVOR} />
    </div>
  );
}
