import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Globe, Heart, BookOpen } from "lucide-react";

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  description: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

function StatCard({
  icon: Icon,
  value,
  label,
  description,
  trend,
}: StatCardProps) {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl group transition-all duration-500 hover:scale-105 text-center border border-gray-200">
      <CardContent className="p-8 space-y-6">
        <div className="w-20 h-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <Icon className="w-10 h-10 text-blue-950 relative z-10" />
        </div>

        <div className="space-y-3">
          <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-950 to-cyan-600 bg-clip-text text-transparent">
            {value}
          </div>
          <h3 className="text-xl font-bold text-fom-secondary">{label}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {trend && (
          <Badge
            variant="secondary"
            className={`${
              trend.isPositive
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : "bg-red-500/20 text-red-400 border-red-500/30"
            }`}
          >
            {trend.isPositive ? "↗" : "↘"} {trend.value}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}

interface FomStatsProps {
  className?: string;
}

export function FomStats({ className = "" }: FomStatsProps) {
  const stats = [
    {
      icon: Users,
      value: "2,500+",
      label: "Active Members",
      description: "Believers growing together in faith and fellowship",
      trend: { value: "+15% this year", isPositive: true },
    },
    {
      icon: Globe,
      value: "45+",
      label: "Countries Reached",
      description: "Nations touched by our mission outreach programs",
      trend: { value: "+8 new countries", isPositive: true },
    },
    {
      icon: Heart,
      value: "12,000+",
      label: "Lives Transformed",
      description: "People who have accepted Jesus Christ as their Savior",
      trend: { value: "+25% growth", isPositive: true },
    },
    {
      icon: BookOpen,
      value: "150+",
      label: "Bible Studies",
      description: "Weekly study groups and discipleship programs",
      trend: { value: "+20 new groups", isPositive: true },
    },
  ];

  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden ${className}`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/10 to-gray-900/30"></div>

      {/* Animated floating elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-950/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-10 left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-8">
            Bringing Jesus to the World
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
            See the incredible impact of our ministry community across the globe
          </p>
          <div className="mt-8 w-32 h-2 bg-gradient-to-r from-blue-950 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
