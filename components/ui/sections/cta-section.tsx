import { Button } from "@/components/ui/button";

interface CallToActionSectionProps {
  variant?: "gradient" | "solid" | "light";
  className?: string;
}

export function CallToActionSection({
  variant = "gradient",
  className = "",
}: CallToActionSectionProps) {
  const variantClasses = {
    gradient:
      "py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-r from-blue-950 via-fom-secondary to-cyan-600",
    solid:
      "py-20 px-4 sm:px-6 lg:px-8 bg-blue-950 text-white relative overflow-hidden",
    light:
      "py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 text-gray-900 relative overflow-hidden",
  };

  return (
    <section className={`${variantClasses[variant]} ${className}`}>
      {/* Background Effects */}
      {variant === "gradient" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-blue-900/30"></div>
          <div className="animate-pulse absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div
            className="animate-pulse absolute bottom-10 left-10 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl"
            style={{ animationDelay: "2s" }}
          ></div>
        </>
      )}

      {variant === "light" && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50"></div>
      )}

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl font-black mb-8">
          Ready to Answer the Call?
        </h2>
        <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-white/90 font-medium">
          Join our community of believers as we work together to fulfill the
          Great Commission and make disciples of all nations.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-950 hover:from-cyan-600 hover:to-blue-950 text-white text-xl px-12 py-6 font-bold hover:scale-105 transition-all">
            Get Started Today
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-950 hover:from-cyan-600 hover:to-blue-950 text-white text-xl px-12 py-6 font-bold hover:scale-105 transition-all"
          >
            Learn More About Us
          </Button>
        </div>
      </div>
    </section>
  );
}
