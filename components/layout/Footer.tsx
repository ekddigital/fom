import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-8 text-center border-t border-gray-200 bg-slate-50">
      <div className="container mx-auto px-4">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} WeSustainEco. All rights reserved.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          <a
            href="https://www.wesustaineco.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600"
          >
            www.wesustaineco.org
          </a>
        </p>
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col items-center justify-center">
          <p className="text-xs text-gray-500 mb-2">Powered by</p>
          <a
            href="https://www.ekddigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center group"
          >
            <Image
              src="/ekddigital.png"
              alt="EKD Digital Logo"
              width={70} // Adjusted width for better spacing with text
              height={18} // Adjusted height for better spacing with text
              className="h-5 w-auto mr-2 group-hover:opacity-80 transition-opacity"
            />
            <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
              EKD Digital
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
