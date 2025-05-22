
const Footer = () => {
  return (
    <footer className="py-6 text-center border-t border-gray-200">
      <p className="text-gray-600">
        © {new Date().getFullYear()} WeSustainEco. All rights reserved.
      </p>
      <p className="text-sm text-gray-500 mt-1">
        <a href="https://www.wesustaineco.org" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
          www.wesustaineco.org
        </a>
      </p>
    </footer>
  );
};

export default Footer;
