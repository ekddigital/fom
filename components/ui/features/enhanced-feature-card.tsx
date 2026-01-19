import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FOM_FEATURES } from "@/lib/constants/fom";
import {
  ArrowRight,
  Heart,
  Users,
  Globe,
  BookOpen,
  Calendar,
  MessageCircle,
} from "lucide-react";

interface FeatureCardProps {
  feature: keyof typeof FOM_FEATURES;
  className?: string;
  variant?: "default" | "premium" | "minimal";
}

const iconMap = {
  ministry: Heart,
  community: Users,
  missions: Globe,
  study: BookOpen,
  events: Calendar,
  prayer: MessageCircle,
};

export function FeatureCard({
  feature,
  className = "",
  variant = "default",
}: FeatureCardProps) {
  const featureData = FOM_FEATURES[feature];
  const IconComponent = iconMap[feature];

  // Map features to consistent Tailwind classes
  const getFeatureClasses = (featureKey: keyof typeof FOM_FEATURES) => {
    switch (featureKey) {
      case "ministry":
      case "study":
        return {
          iconBgClass: "bg-blue-950",
          badgeClass: "bg-blue-950",
          iconClass: "text-white",
        };
      case "community":
      case "events":
        return {
          iconBgClass: "bg-cyan-600",
          badgeClass: "bg-cyan-600",
          iconClass: "text-white",
        };
      case "missions":
      case "prayer":
        return {
          iconBgClass: "bg-fom-secondary",
          badgeClass: "bg-fom-secondary",
          iconClass: "text-white",
        };
      default:
        return {
          iconBgClass: "bg-blue-950",
          badgeClass: "bg-blue-950",
          iconClass: "text-white",
        };
    }
  };

  const classes = getFeatureClasses(feature);

  if (variant === "premium") {
    return (
      <Card
        className={`bg-white shadow-lg hover:shadow-xl group transition-all duration-500 hover:scale-[1.02] border border-gray-200 relative overflow-hidden ${className}`}
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <CardHeader className="space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden ${classes.iconBgClass}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <IconComponent
                className={`w-8 h-8 relative z-10 ${classes.iconClass}`}
              />
            </div>
            <Badge
              variant="secondary"
              className={`${classes.badgeClass} text-white border-0 animate-pulse`}
            >
              Featured
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-950 to-cyan-600 bg-clip-text text-transparent group-hover:from-fom-secondary group-hover:to-fom-secondary transition-all duration-300">
            {featureData.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <CardDescription className="text-gray-600 leading-relaxed text-lg">
            {featureData.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="relative z-10">
          <Button className="w-full justify-between bg-gradient-to-r from-blue-950 to-cyan-600 hover:from-fom-secondary hover:to-fom-secondary text-white group-hover:shadow-lg">
            Explore More
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (variant === "minimal") {
    return (
      <Card
        className={`group bg-dark-card border-fom-secondary/20 hover-fom-glow transition-all duration-300 ${className}`}
      >
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-fom-primary-glass">
              <IconComponent className="w-7 h-7 text-fom-secondary" />
            </div>
            <div className="space-y-3 flex-1">
              <h3 className="font-semibold text-fom-glow group-hover:text-fom-secondary transition-colors text-lg">
                {featureData.title}
              </h3>
              <p className="text-fom-muted leading-relaxed">
                {featureData.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card
      className={`group bg-dark-card hover-fom-lift transition-all duration-500 hover:scale-[1.01] border-fom-secondary/30 relative overflow-hidden ${className}`}
    >
      {/* Subtle background animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-fom-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <CardContent className="p-8 space-y-6 relative z-10">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-fom-primary-glass relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <IconComponent className="w-8 h-8 text-fom-secondary relative z-10" />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold heading-fom group-hover:heading-fom-gradient transition-all duration-300">
            {featureData.title}
          </h3>
          <p className="text-fom-muted leading-relaxed text-lg">
            {featureData.description}
          </p>
          <Button
            variant="ghost"
            className="p-0 h-auto text-left justify-start text-fom-emphasis hover:text-fom-glow hover-fom-glow transition-all duration-300"
          >
            Learn More
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
