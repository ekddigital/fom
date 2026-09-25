import { AdminShell } from "@/components/ui/layout/admin-shell";
import { noindexMetadata } from "@/lib/seo/page-metadata";

export const metadata = noindexMetadata;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
