import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";
import { HeroSection } from "@/components/ui/sections/hero-section";
import { FeatureGrid } from "@/components/ui/features/feature-grid";
import { CallToActionSection } from "@/components/ui/sections/cta-section";
import { FomStats } from "@/components/ui/sections/fom-stats";
import { FomTestimonials } from "@/components/ui/sections/fom-testimonials";
import { FomNewsletter } from "@/components/ui/sections/fom-newsletter";
import { FOM_BRAND } from "@/lib/constants/fom";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <HeroSection />

      {/* Our Covenant Verse Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 leading-relaxed">
              "{FOM_BRAND.covenantText}"
            </blockquote>
            <cite className="text-lg sm:text-xl md:text-2xl text-fom-secondary font-semibold">
              - {FOM_BRAND.covenantVerse}
            </cite>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Design */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Subtle floating elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
              Growing in Faith Together
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 max-w-5xl mx-auto leading-relaxed font-semibold">
              Discover the many ways to connect, grow, and serve in our ministry
              community through transformative experiences
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="w-32 h-2 bg-gradient-to-r from-blue-950 to-blue-800 rounded-full"></div>
              <div className="w-8 h-2 bg-blue-400 rounded-full"></div>
              <div className="w-16 h-2 bg-blue-300 rounded-full"></div>
            </div>
          </div>

          <FeatureGrid />
        </div>
      </section>

      <FomStats />

      <FomTestimonials />

      <FomNewsletter />

      <CallToActionSection />

      <PublicFooter />
    </div>
  );
}
