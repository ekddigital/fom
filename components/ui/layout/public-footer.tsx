import { FomLogo } from "@/components/ui/branding/fom-logo";
import { FOM_BRAND, FOM_NAVIGATION } from "@/lib/constants/fom";

interface PublicFooterProps {
  className?: string;
}

export function PublicFooter({ className = "" }: PublicFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden `}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
      <div className="animate-pulse absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-950/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <FomLogo size="md" className="mb-6 text-white font-bold text-xl" />
            <p className="text-gray-300 leading-relaxed text-lg">
              Making disciples of all nations since {FOM_BRAND.foundedYear}.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-950 to-cyan-500 rounded-full"></div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-xl">Ministry</h3>
            <ul className="space-y-4 text-gray-300">
              <li>
                <a
                  href="/sermons"
                  className="hover:text-cyan-400 transition-all duration-300 text-lg hover:translate-x-1"
                >
                  Sermons
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-cyan-400 transition-all duration-300 text-lg hover:translate-x-1"
                >
                  Bible Studies
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="hover:text-cyan-400 transition-all duration-300 text-lg hover:translate-x-1"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/missions"
                  className="hover:text-cyan-400 transition-all duration-300 text-lg hover:translate-x-1"
                >
                  Mission Trips
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-xl">Community</h3>
            <ul className="space-y-4 text-gray-300">
              <li>
                <a
                  href="/prayer"
                  className="hover:text-cyan-400 transition-all duration-300 text-lg hover:translate-x-1"
                >
                  Prayer Requests
                </a>
              </li>
              <li>
                <a
                  href="/testimonies"
                  className="hover:text-cyan-400 transition-all duration-300 text-lg hover:translate-x-1"
                >
                  Testimonies
                </a>
              </li>
              <li>
                <a
                  href="/groups"
                  className="hover:text-cyan-400 transition-all duration-300 text-lg hover:translate-x-1"
                >
                  Small Groups
                </a>
              </li>
              <li>
                <a
                  href="/volunteer"
                  className="hover:text-cyan-400 transition-all duration-300 text-lg hover:translate-x-1"
                >
                  Volunteer
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-xl">Support</h3>
            <ul className="space-y-4 text-gray-300">
              <li>
                <a
                  href="/give"
                  className="hover:text-cyan-400 transition-all duration-300 text-lg hover:translate-x-1"
                >
                  Give
                </a>
              </li>
              <li>
                <a
                  href="/partnerships"
                  className="hover:text-cyan-400 transition-all duration-300 text-lg hover:translate-x-1"
                >
                  Partner with Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-cyan-400 transition-all duration-300 text-lg hover:translate-x-1"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-cyan-400 transition-all duration-300 text-lg hover:translate-x-1"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-16 pt-12 text-center space-y-6">
          <p className="text-gray-400 text-lg font-medium">
            &copy; {FOM_BRAND.foundedYear} - {currentYear} {FOM_BRAND.name}. All
            rights reserved. | Founded in {FOM_BRAND.foundedYear}
          </p>
          <p className="text-cyan-300 text-xl max-w-4xl mx-auto leading-relaxed font-semibold">
            "{FOM_BRAND.greatCommissionText}" - {FOM_BRAND.greatCommission}
          </p>
        </div>
      </div>
      
    </footer>
  );
}
