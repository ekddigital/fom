import { ReactNode } from "react";
import { FomLogo } from "@/components/ui/branding/fom-logo";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-fom-primary/5 to-blue-50">
      <div className="flex min-h-screen">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-fom-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-fom-primary to-blue-800"></div>
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
            <div className="mb-8">
              <FomLogo size="lg" />
            </div>
            <div className="text-center max-w-md">
              <h1 className="text-3xl font-bold mb-4">
                Welcome to Fishers of Men
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed">
                Join our global ministry community dedicated to preaching the
                gospel and making disciples of all nations.
              </p>
              <div className="mt-8 text-sm text-blue-200">
                <p>
                  &quot;Go therefore and make disciples of all nations...&quot;
                </p>
                <p className="font-semibold">- Matthew 28:19-20</p>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/5 translate-y-48 -translate-x-48"></div>
        </div>

        {/* Right side - Auth form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-8">
              <FomLogo size="lg" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
