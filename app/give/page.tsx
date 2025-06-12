import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Globe,
  Users,
  BookOpen,
  Home,
  HandHeart,
  Shield,
  CreditCard,
  Smartphone,
  DollarSign,
} from "lucide-react";
import { FOM_BRAND } from "@/lib/constants/fom";

export default function GivePage() {
  const donationAreas = [
    {
      icon: Globe,
      title: "Global Missions",
      description:
        "Support our missionaries and global outreach programs spreading the Gospel worldwide.",
      goal: "$50,000",
      raised: "$32,500",
      percentage: 65,
    },
    {
      icon: Users,
      title: "Community Outreach",
      description:
        "Help us serve our local community through food banks, homeless ministries, and social programs.",
      goal: "$25,000",
      raised: "$18,750",
      percentage: 75,
    },
    {
      icon: BookOpen,
      title: "Educational Programs",
      description:
        "Fund Bible studies, theological education, and Christian literature distribution.",
      goal: "$15,000",
      raised: "$8,250",
      percentage: 55,
    },
    {
      icon: Home,
      title: "Building Fund",
      description:
        "Support facility improvements and expansion to better serve our growing community.",
      goal: "$100,000",
      raised: "$67,500",
      percentage: 67,
    },
  ];

  const givingMethods = [
    {
      icon: CreditCard,
      title: "Online Giving",
      description: "Secure online donations via credit card or bank transfer",
      features: ["Instant processing", "Recurring donations", "Tax receipts"],
      recommended: true,
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Give on-the-go with our mobile app",
      features: ["Quick giving", "Text-to-give", "Mobile receipts"],
      recommended: false,
    },
    {
      icon: DollarSign,
      title: "Cash & Check",
      description: "Traditional giving during services or mail-in donations",
      features: ["In-person giving", "Mail donations", "Legacy gifts"],
      recommended: false,
    },
  ];

  const quickAmounts = [25, 50, 100, 250, 500, 1000];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
              Give & Support
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
              Partner with us in spreading the Gospel and serving our community.
              Your generous giving enables us to fulfill our mission of making
              disciples of all nations.
            </p>
            <blockquote className="text-lg italic text-blue-800 mb-8">
              "Give, and it will be given to you. A good measure, pressed down,
              shaken together and running over, will be poured into your lap." -
              Luke 6:38
            </blockquote>
            <Button className="bg-gradient-to-r from-blue-950 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-8 py-3 text-lg">
              <Heart className="w-5 h-5 mr-2" />
              Give Now
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Giving Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-blue-200 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-950">
                Quick Donation
              </CardTitle>
              <p className="text-gray-700">Choose an amount to get started</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    className="border-blue-200 text-blue-950 hover:bg-blue-950 hover:text-white h-12 text-lg font-semibold"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Or enter a custom amount
                </p>
                <div className="flex justify-center space-x-4">
                  <Button className="bg-gradient-to-r from-blue-950 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-8 py-3">
                    One-Time Gift
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-950 hover:bg-blue-50 px-8 py-3"
                  >
                    Monthly Giving
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-sm text-blue-800">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Secure SSL encryption protects your donation. Tax-deductible
                  receipts provided.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ministry Areas Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              Where Your Gifts Make a Difference
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              See how your contributions are actively transforming lives and
              communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {donationAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <Card
                  key={index}
                  className="border-blue-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-blue-950" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-blue-950">
                          {area.title}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className="text-green-700 border-green-300 mt-1"
                        >
                          {area.percentage}% funded
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{area.description}</p>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Raised: {area.raised}</span>
                        <span>Goal: {area.goal}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${area.percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <Button className="w-full bg-blue-950 hover:bg-blue-800 text-white">
                      Support This Ministry
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Giving Methods Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              Ways to Give
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Choose the giving method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {givingMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card
                  key={index}
                  className={`border-blue-200 hover:shadow-lg transition-all duration-300 relative ${
                    method.recommended ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  {method.recommended && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                      Recommended
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-blue-950" />
                    </div>
                    <CardTitle className="text-xl text-blue-950">
                      {method.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 text-center">
                      {method.description}
                    </p>

                    <ul className="space-y-2">
                      {method.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        method.recommended
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-blue-950 hover:bg-blue-800"
                      } text-white`}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Impact in Numbers
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See how your generous giving is making a real difference
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1,250", label: "Lives Touched", icon: HandHeart },
              { number: "45", label: "Countries Reached", icon: Globe },
              { number: "320", label: "Families Helped", icon: Users },
              { number: "15", label: "New Churches", icon: Home },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="space-y-3">
                  <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto">
                    <IconComponent className="w-8 h-8 text-blue-100" />
                  </div>
                  <div className="text-4xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-blue-200">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ/Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-950 mb-4">
              Giving Information
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-xl text-blue-950">
                  Tax Deductibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {FOM_BRAND.name} is a 501(c)(3) non-profit organization. All
                  donations are tax-deductible to the full extent allowed by
                  law. You will receive a receipt for your records.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-xl text-blue-950">
                  Financial Transparency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We are committed to financial transparency and stewardship.
                  Annual financial reports and ministry impact statements are
                  available upon request.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-xl text-blue-950">
                  Recurring Giving
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Set up automatic monthly giving to provide consistent support
                  for our ministries. You can modify or cancel recurring gifts
                  at any time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-xl text-blue-950">
                  Other Ways to Give
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Consider planned giving, stock donations, or legacy gifts.
                  Contact our office to learn more about these special giving
                  opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
