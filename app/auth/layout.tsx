import { noindexMetadata } from "@/lib/seo/page-metadata";

export const metadata = noindexMetadata;

export default function AuthPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
