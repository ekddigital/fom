import type { Metadata } from "next";
import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";
import { EKDDigitalFlyerShell } from "@/components/jicf/ekddigital-flyer";

export const metadata: Metadata = {
  title: "EKD Digital — Build · Write · Deliver",
  description:
    "EKD Digital helps students and professionals with academic papers, thesis writing, Android & iOS apps, websites, desktop applications and technical writing. We are just a button away.",
};

export default function EKDDigitalFlyerPage() {
  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-linear-to-b from-[#07090f] via-[#0c1221] to-[#07090f]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-6">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#C9972E] mb-2">
              EKD Digital Services
            </p>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Build · Write · Deliver
            </h1>
            <p className="mt-2 text-sm text-[#9ca3af]">
              Academic Writing · App Development · Technical Services
            </p>
          </div>

          <EKDDigitalFlyerShell />
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
