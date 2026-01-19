import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Bell, Gift } from "lucide-react";

interface FomNewsletterProps {
  variant?: "inline" | "section" | "modal";
  className?: string;
}

export function FomNewsletter({
  variant = "section",
  className = "",
}: FomNewsletterProps) {
  const benefits = [
    { icon: Mail, text: "Weekly devotionals & Bible studies" },
    { icon: Bell, text: "Ministry updates & prayer requests" },
    { icon: Gift, text: "Exclusive content & resources" },
  ];

  if (variant === "inline") {
    return (
      <Card
        className={`bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 ${className}`}
      >
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
            <div className="flex-1">
              <h3 className="text-blue-900 text-xl font-bold mb-2">
                Stay Connected with Our Ministry
              </h3>
              <p className="text-gray-600">
                Get weekly devotionals, ministry updates, and exclusive content
                delivered to your inbox
              </p>
            </div>
            <div className="flex space-x-2 min-w-[300px]">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-blue-50 border-blue-200 text-blue-900 placeholder:text-gray-500"
              />
              <Button className="bg-gradient-to-r from-blue-950 to-cyan-600 hover:from-fom-secondary hover:to-fom-secondary text-white whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "modal") {
    return (
      <div
        className={`bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto border border-gray-200 ${className}`}
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-950" />
          </div>
          <h3 className="bg-gradient-to-r from-blue-950 to-cyan-600 bg-clip-text text-transparent text-2xl font-bold mb-2">
            Stay Connected with Our Ministry
          </h3>
          <p className="text-gray-600">
            Get weekly devotionals, ministry updates, and exclusive content
            delivered to your inbox
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <benefit.icon className="w-4 h-4 text-blue-950" />
              </div>
              <span className="text-gray-600 text-sm">{benefit.text}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="bg-blue-50 border-blue-200 text-blue-900 placeholder:text-gray-500"
          />
          <Button className="w-full bg-gradient-to-r from-blue-950 to-cyan-600 hover:from-fom-secondary hover:to-fom-secondary text-white">
            Join Our Community
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    );
  }

  // Section variant (default)
  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-blue-900 relative overflow-hidden ${className}`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800/30 to-cyan-800/30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>

      {/* Floating elements */}
      <div className="animate-pulse absolute top-10 right-10 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
      <div
        className="animate-pulse absolute bottom-10 left-10 w-48 h-48 bg-blue-400/15 rounded-full blur-3xl"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-blue-950 text-white border-0 mb-6 text-sm font-semibold px-4 py-2">
            ✨ Join 2,500+ Believers
          </Badge>

          <h2 className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Stay Connected with Our Ministry
          </h2>

          <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed font-medium">
            Get weekly devotionals, ministry updates, and exclusive content
            delivered to your inbox
          </p>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-14 h-14 bg-blue-950/20 rounded-xl flex items-center justify-center mx-auto">
                      <benefit.icon className="w-7 h-7 text-cyan-300" />
                    </div>
                    <p className="text-blue-100 font-medium">{benefit.text}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Newsletter Form */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-blue-200 text-lg p-6"
                />
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-950 hover:from-cyan-600 hover:to-blue-950 text-white text-lg px-8 py-6 hover:scale-105 transition-all">
                  Subscribe Now
                </Button>
              </div>

              <p className="text-sm text-blue-200 text-center mt-6">
                Join thousands of believers receiving weekly inspiration.
                <span className="text-cyan-300 font-medium">
                  {" "}
                  Unsubscribe anytime.
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
