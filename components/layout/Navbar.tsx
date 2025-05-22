
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="py-4 shadow-sm">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600">
          WeSustainEco
        </Link>
        <ul className="flex items-center space-x-6">
          <li>
            <Link href="/" className="hover:text-green-600 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-green-600 transition-colors">
              About
            </Link>
          </li>
          {/* TODO: Add more links based on the sitemap */}
          <li>
            <Link href="/contact" className="hover:text-green-600 transition-colors">
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
