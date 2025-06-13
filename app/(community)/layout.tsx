import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        {children}
      </main>
      <PublicFooter />
    </>
  );
}
