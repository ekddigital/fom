import { Button } from "@/components/ui/button";
import { FOM_BRAND } from "@/lib/constants/fom";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <section
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white relative overflow-hidden py-20 ${className}`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-blue-900/10"></div>

      {/* Animated floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-gray-900 leading-tight">
          Called to be{" "}
          <span className="bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
            Fishers of Men
          </span>
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl text-fom-secondary mb-8 max-w-4xl mx-auto font-semibold leading-relaxed">
          &quot;{FOM_BRAND.scriptureText}&quot; - {FOM_BRAND.scriptureVerse}
        </p>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 max-w-5xl mx-auto leading-relaxed">
          Welcome to {FOM_BRAND.name}, a Christian organization founded in{" "}
          {FOM_BRAND.foundedYear} with the mission to preach the gospel to the
          world and make disciples of all nations. Join us as we spread the love
          of Jesus Christ through ministry, missions, and community outreach.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-950 to-blue-800 hover:from-fom-secondary hover:to-blue-950 text-white text-lg px-8 py-4 h-auto font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Start Your Journey
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-4 h-auto border-2 border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white font-semibold transition-all"
          >
            Watch Latest Sermon
          </Button>
        </div>
      </div>
    </section>
  );
}
