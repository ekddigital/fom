import { FeatureCard } from "./enhanced-feature-card";
import { FOM_FEATURES } from "@/lib/constants/fom";

interface FeatureGridProps {
  features?: (keyof typeof FOM_FEATURES)[];
  variant?: "default" | "premium" | "minimal";
  className?: string;
}

export function FeatureGrid({
  features = ["ministry", "community", "missions", "study", "events", "prayer"],
  variant = "premium",
  className = "",
}: FeatureGridProps) {
  return (
    <div
      className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 ${className}`}
    >
      {features.map((feature, index) => (
        <div
          key={feature}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <FeatureCard feature={feature} variant={variant} />
        </div>
      ))}
    </div>
  );
}
