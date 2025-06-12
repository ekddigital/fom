import { Button } from "@/components/ui/button";
import { FOM_FEATURES } from "@/lib/constants/fom";

interface FeatureCardProps {
  feature: keyof typeof FOM_FEATURES;
  className?: string;
}

export function FeatureCard({ feature, className = "" }: FeatureCardProps) {
  const featureData = FOM_FEATURES[feature];

  // Map features to consistent Tailwind classes
  const getFeatureClasses = (featureKey: keyof typeof FOM_FEATURES) => {
    switch (featureKey) {
      case "ministry":
      case "study":
        return {
          bgClass: "bg-blue-50",
          iconClass: "text-blue-950",
          buttonClass: "text-blue-950 hover:bg-blue-50",
        };
      case "community":
      case "events":
        return {
          bgClass: "bg-cyan-50",
          iconClass: "text-cyan-600",
          buttonClass: "text-cyan-600 hover:bg-cyan-50",
        };
      case "missions":
      case "prayer":
        return {
          bgClass: "bg-blue-100",
          iconClass: "text-fom-secondary",
          buttonClass: "text-fom-secondary hover:bg-blue-100",
        };
      default:
        return {
          bgClass: "bg-blue-50",
          iconClass: "text-blue-950",
          buttonClass: "text-blue-950 hover:bg-blue-50",
        };
    }
  };

  const classes = getFeatureClasses(feature);

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer ${className}`}
    >
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${classes.bgClass}`}
      >
        <span className={`text-2xl ${classes.iconClass}`}>
          {featureData.icon}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {featureData.title}
      </h3>
      <p className="text-gray-600 mb-4">{featureData.description}</p>
      <Button
        variant="ghost"
        className={`${classes.buttonClass} transition-colors`}
      >
        Learn More →
      </Button>
    </div>
  );
}
