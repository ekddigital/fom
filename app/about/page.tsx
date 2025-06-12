import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";
import { FomLogo } from "@/components/ui/branding/fom-logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FOM_BRAND } from "@/lib/constants/fom";
import {
  Heart,
  Users,
  Globe,
  Book,
  Calendar,
  MessageCircle,
} from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Heart,
      title: "Ministry & Outreach",
      description:
        "Spreading the gospel through community engagement and charitable work.",
    },
    {
      icon: Users,
      title: "Community Building",
      description:
        "Creating strong bonds among believers through fellowship and support.",
    },
    {
      icon: Globe,
      title: "Global Missions",
      description:
        "Reaching every corner of the world with the message of Jesus Christ.",
    },
    {
      icon: Book,
      title: "Biblical Education",
      description:
        "Providing comprehensive Bible studies and spiritual growth resources.",
    },
    {
      icon: Calendar,
      title: "Events & Gatherings",
      description:
        "Regular events that bring our community together in worship and learning.",
    },
    {
      icon: MessageCircle,
      title: "Prayer Support",
      description:
        "A dedicated prayer network supporting members through all life's challenges.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <FomLogo size="lg" showText={true} textPosition="bottom" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
              About {FOM_BRAND.name}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
              {FOM_BRAND.tagline} - Founded in {FOM_BRAND.foundedYear} with a
              mission of {FOM_BRAND.mission.toLowerCase()}
            </p>
            <div className="flex justify-center space-x-4">
              <Badge
                variant="outline"
                className="text-blue-950 border-blue-200 bg-blue-50"
              >
                Founded {FOM_BRAND.foundedYear}
              </Badge>
              <Badge
                variant="outline"
                className="text-blue-950 border-blue-200 bg-blue-50"
              >
                Global Ministry
              </Badge>
              <Badge
                variant="outline"
                className="text-blue-950 border-blue-200 bg-blue-50"
              >
                Christian Organization
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-6">
                Our Mission & Vision
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {FOM_BRAND.name} is dedicated to fulfilling the Great Commission
                by making disciples of all nations. We believe in the
                transformative power of the Gospel and are committed to sharing
                God&apos;s love through practical ministry, community outreach,
                and global missions.
              </p>
              <blockquote className="border-l-4 border-blue-500 pl-6 mb-6">
                <p className="text-xl font-semibold text-blue-950 mb-2">
                  &quot;{FOM_BRAND.scriptureText}&quot;
                </p>
                <cite className="text-blue-700">
                  - {FOM_BRAND.scriptureVerse}
                </cite>
              </blockquote>
              <blockquote className="border-l-4 border-blue-500 pl-6">
                <p className="text-xl font-semibold text-blue-950 mb-2">
                  &quot;{FOM_BRAND.greatCommissionText}&quot;
                </p>
                <cite className="text-blue-700">
                  - {FOM_BRAND.greatCommission}
                </cite>
              </blockquote>
            </div>
            <div className="relative">
              <Card className="border-blue-200 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-950 to-blue-800 text-white">
                  <CardTitle className="text-center text-2xl">
                    Our Covenant Verse
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 text-center">
                  <p className="text-xl font-semibold text-blue-950 mb-4">
                    &quot;{FOM_BRAND.covenantText}&quot;
                  </p>
                  <cite className="text-blue-700 font-medium">
                    - {FOM_BRAND.covenantVerse}
                  </cite>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              What We Do
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We engage in various ministries and activities designed to grow
              our faith community and reach others with the Gospel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-blue-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-blue-950" />
                    </div>
                    <CardTitle className="text-xl text-blue-950">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              These values guide everything we do as a ministry community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Faith",
                description:
                  "Unwavering trust in Jesus Christ as our Lord and Savior",
              },
              {
                title: "Love",
                description:
                  "Demonstrating God's love through our actions and relationships",
              },
              {
                title: "Unity",
                description: "Building a diverse community united in Christ",
              },
              {
                title: "Service",
                description:
                  "Serving others as Jesus served, with humility and compassion",
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {value.title[0]}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-blue-950 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
