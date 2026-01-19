"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Crown,
  Trophy,
  Heart,
  Users,
  Globe,
  Droplets,
  Star,
} from "lucide-react";
import {
  CERTIFICATE_TEMPLATES,
  getCertificateTemplate,
  FOM_COLORS,
} from "@/lib/utils/certificate-templates";
import { TemplateData } from "@/lib/utils/certificate";

interface TemplateStarterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (templateData: TemplateData) => void;
}

// Template category icons mapping
const TEMPLATE_ICONS = {
  "Certificate of Appreciation": Heart,
  "Certificate of Excellence": Trophy,
  "Ministry Leadership Certificate": Crown,
  "Faithful Service Award": Star,
  "Volunteer Recognition": Users,
  "Mission Completion": Globe,
  "Baptism Certificate": Droplets,
  "Youth Achievement": Sparkles,
  "Pastor Appreciation": Crown,
};

// Template category colors
const TEMPLATE_COLORS = {
  "Certificate of Appreciation": "bg-blue-50 border-blue-200",
  "Certificate of Excellence": "bg-purple-50 border-purple-200",
  "Ministry Leadership Certificate": "bg-indigo-50 border-indigo-200",
  "Faithful Service Award": "bg-amber-50 border-amber-200",
  "Volunteer Recognition": "bg-green-50 border-green-200",
  "Mission Completion": "bg-teal-50 border-teal-200",
  "Baptism Certificate": "bg-cyan-50 border-cyan-200",
  "Youth Achievement": "bg-pink-50 border-pink-200",
  "Pastor Appreciation": "bg-violet-50 border-violet-200",
};

export function CertificateTemplateStarter({
  open,
  onOpenChange,
  onSelectTemplate,
}: TemplateStarterProps) {
  const handleSelectTemplate = (templateName: string) => {
    const template = getCertificateTemplate(templateName);
    if (template) {
      onSelectTemplate(template);
      onOpenChange(false);
    }
  };

  const handleStartBlank = () => {
    // Create a minimal blank template
    const blankTemplate: TemplateData = {
      name: "Custom Template",
      description: "A custom certificate template",
      elements: [],
      pageSettings: {
        width: 800,
        height: 600,
        margin: { top: 40, right: 40, bottom: 40, left: 40 },
        background: {
          color: "#ffffff",
        },
      },
      fonts: [
        {
          family: "serif",
          variants: ["normal", "bold", "italic"],
        },
      ],
    };

    onSelectTemplate(blankTemplate);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Choose a Certificate Template
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Start with one of our beautiful, professionally designed templates
            or create from scratch
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Start from scratch option */}
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Start from Scratch</h3>
                <p className="text-gray-600 text-sm">
                  Create a completely custom certificate design
                </p>
              </div>
              <Button
                onClick={handleStartBlank}
                variant="outline"
                className="mt-4"
              >
                Create Blank Template
              </Button>
            </div>
          </div>

          {/* Pre-made templates */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Professional Templates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CERTIFICATE_TEMPLATES.map((template) => {
                const IconComponent =
                  TEMPLATE_ICONS[template.name as keyof typeof TEMPLATE_ICONS];
                const cardColor =
                  TEMPLATE_COLORS[
                    template.name as keyof typeof TEMPLATE_COLORS
                  ];

                return (
                  <Card
                    key={template.name}
                    className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${cardColor}`}
                    onClick={() => handleSelectTemplate(template.name!)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                          {IconComponent && (
                            <IconComponent
                              className="w-5 h-5"
                              style={{ color: FOM_COLORS.primary }}
                            />
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          FOM Branded
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {template.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed mb-4">
                        {template.description}
                      </CardDescription>

                      {/* Template preview miniature */}
                      <div className="bg-white rounded border p-2 mb-3">
                        <div
                          className="w-full h-16 rounded border-2 flex items-center justify-center text-xs text-gray-500 relative overflow-hidden"
                          style={{
                            backgroundColor:
                              template.pageSettings?.background?.color ||
                              "#ffffff",
                          }}
                        >
                          {/* Mini preview content */}
                          <div className="text-center space-y-1">
                            <div
                              className="text-xs font-bold"
                              style={{ color: FOM_COLORS.primary }}
                            >
                              FISHERS OF MEN
                            </div>
                            <div className="text-xs">{template.name}</div>
                          </div>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className="w-full"
                        style={{ backgroundColor: FOM_COLORS.primary }}
                      >
                        Use This Template
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Features highlight */}
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <h4 className="font-semibold mb-2">✨ All Templates Include:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-700">
              <div>🎨 FOM Color Palette</div>
              <div>📖 Covenant Verse</div>
              <div>🏷️ Professional Design</div>
              <div>🔧 Fully Customizable</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
