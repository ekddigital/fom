const Footer = () => {
  return (
    <footer className="py-8 text-center border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Study Progress Tracker. All rights
          reserved.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          Empowering students to achieve their learning goals.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
