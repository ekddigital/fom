// import Image from "next/image"; // Keep Image import if you plan to use a logo later

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center p-6 bg-gray-50">
      <div className="max-w-2xl">
        {/* Optional: You can add a logo here if you have one */}
        {/* <Image src="/logo.svg" alt="WeSustainEco Logo" width={150} height={50} className="mb-8" /> */}

        <h1 className="text-5xl font-bold text-green-700 mb-6">
          WeSustainEco is Coming Soon!
        </h1>

        <p className="text-xl text-gray-700 mb-4">
          Our new website is currently under construction. We&apos;re working
          hard to create a platform dedicated to driving sustainable futures.
        </p>

        <p className="text-lg text-gray-600 mb-8">
          We&apos;re excited to share our innovative solutions for
          environmental, governmental, and social sustainability. Please check
          back soon for updates!
        </p>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Want to get in touch or learn more?
          </h2>
          <p className="text-gray-700 mb-1">
            This project is being developed by EKD Digital.
          </p>
          <p className="text-gray-700">
            Contact us at:{" "}
            <a
              href="mailto:ekd@ekddigital.com"
              className="text-blue-600 hover:underline"
            >
              ekd@ekddigital.com
            </a>
          </p>
          <p className="text-gray-700 mt-1">
            Visit our website:{" "}
            <a
              href="https://www.ekddigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              www.ekddigital.com
            </a>
          </p>
        </div>

        {/* Optional: Add a countdown timer or a newsletter signup form here later */}
        {/* 
        <div className="mt-10">
          <p className="text-gray-500">Sign up for our newsletter to get notified when we launch!</p>
          // Newsletter form component
        </div>
        */}
      </div>
    </div>
  );
}
