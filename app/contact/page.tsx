import { PublicHeader } from "@/components/ui/layout/public-header";
import { PublicFooter } from "@/components/ui/layout/public-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Heart,
  Users,
  Calendar,
  Globe,
  Send,
} from "lucide-react";
import { FOM_BRAND } from "@/lib/constants/fom";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a message anytime",
      contact: "hello@fishersofmen.org",
      action: "mailto:hello@fishersofmen.org",
      actionText: "Send Email",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our ministry team",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567",
      actionText: "Call Now",
    },
    {
      icon: MessageCircle,
      title: "Prayer Requests",
      description: "Share your prayer needs with us",
      contact: "prayer@fishersofmen.org",
      action: "mailto:prayer@fishersofmen.org",
      actionText: "Send Prayer Request",
    },
    {
      icon: Users,
      title: "Ministry Inquiries",
      description: "Questions about getting involved",
      contact: "ministry@fishersofmen.org",
      action: "mailto:ministry@fishersofmen.org",
      actionText: "Get Involved",
    },
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "8:00 AM - 1:00 PM" },
  ];

  const ministryAreas = [
    {
      icon: Heart,
      name: "Pastoral Care",
      description: "Spiritual guidance and counseling",
    },
    {
      icon: Users,
      name: "Community Outreach",
      description: "Local missions and service",
    },
    {
      icon: Globe,
      name: "Global Missions",
      description: "International ministry work",
    },
    {
      icon: Calendar,
      name: "Events & Programs",
      description: "Church activities and gatherings",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
              We&apos;d love to hear from you! Whether you have questions,
              prayer requests, or want to get involved in our ministry,
              we&apos;re here to connect.
            </p>
            <Badge
              variant="outline"
              className="text-blue-950 border-blue-200 bg-blue-50 text-lg px-4 py-2"
            >
              {FOM_BRAND.tagline}
            </Badge>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Choose the best way to reach us based on your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card
                  key={index}
                  className="border-blue-200 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-blue-950" />
                    </div>
                    <CardTitle className="text-xl text-blue-950">
                      {method.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{method.description}</p>
                    <p className="font-semibold text-blue-800">
                      {method.contact}
                    </p>
                    <Button
                      className="w-full bg-blue-950 hover:bg-blue-800 text-white"
                      asChild
                    >
                      <a href={method.action}>{method.actionText}</a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-950 flex items-center">
                  <Send className="w-6 h-6 mr-2" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this message about?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Share your message, questions, or prayer requests..."
                    rows={6}
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-950 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white py-3">
                  Send Message
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  We typically respond within 24 hours during business days.
                </p>
              </CardContent>
            </Card>

            {/* Location & Hours */}
            <div className="space-y-8">
              {/* Office Hours */}
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-950 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="font-medium text-gray-800">
                        {schedule.day}
                      </span>
                      <span className="text-blue-700">{schedule.hours}</span>
                    </div>
                  ))}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Emergency pastoral care is
                      available 24/7. Call our main number and follow the
                      prompts.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-950 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Visit Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-800">Main Campus</p>
                    <p className="text-gray-700">
                      123 Faith Avenue
                      <br />
                      Hope City, HC 12345
                      <br />
                      United States
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-950 hover:bg-blue-50"
                  >
                    Get Directions
                  </Button>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Parking:</strong> Free parking available on-site.
                      Accessible parking spots near the main entrance.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Ministry Areas */}
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-950">
                    Ministry Areas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {ministryAreas.map((area, index) => {
                    const IconComponent = area.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-blue-950" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {area.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {area.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-red-800 mb-4">
            Emergency Pastoral Care
          </h2>
          <p className="text-lg text-red-700 mb-6">
            If you&apos;re experiencing a spiritual or personal crisis and need
            immediate pastoral care, we&apos;re here for you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
              asChild
            >
              <a href="tel:+15551234567">Call Emergency Line</a>
            </Button>
            <Button
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-100 px-8 py-3"
              asChild
            >
              <a href="mailto:emergency@fishersofmen.org">Email Emergency</a>
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
