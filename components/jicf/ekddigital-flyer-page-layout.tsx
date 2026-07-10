import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";

type EKDDigitalFlyerPageLayoutProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  links?: ReactNode;
};

function FlyerPageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center mb-6">
      <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#C8A061] mb-2">
        {eyebrow}
      </p>
      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
        {title}
      </h1>
      <p className="mt-2 text-sm text-[#9ca3af]">{subtitle}</p>
    </div>
  );
}

export function EKDDigitalFlyerPageLayout({
  eyebrow,
  title,
  subtitle,
  children,
  links,
}: EKDDigitalFlyerPageLayoutProps) {
  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-linear-to-b from-[#1F1C18] via-[#2A2520] to-[#1F1C18]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <FlyerPageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

          {links ? (
            <div className="mb-6 flex flex-wrap justify-center gap-2 print:hidden">
              {links}
            </div>
          ) : null}

          {children}
        </div>
      </main>

      <PublicFooter />
    </>
  );
}

export function buildFlyerMetadata(
  title: string,
  description: string,
): Metadata {
  return { title, description };
}
