import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
        Welcome to Study Progress Tracker
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        Your personal dashboard to monitor learning, set goals, and achieve
        academic success. Stay organized and motivated on your educational
        journey.
      </p>

      {/* Project Information Section */}
      <div className="mt-8 mb-12 px-4">
        <div className="max-w-xl mx-auto bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-4 text-center">
            Project Information
          </h2>
          <div className="space-y-2 text-left">
            <p className="text-md text-gray-600 dark:text-gray-300">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Topic:
              </span>{" "}
              Design and Implementation of a Study Progress Tracking System
            </p>
            <p className="text-md text-gray-600 dark:text-gray-300">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Student:
              </span>{" "}
              H.A.ALI ABDULQAWI
            </p>
            <p className="text-md text-gray-600 dark:text-gray-300">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                ID:
              </span>{" "}
              2019529628032
            </p>
          </div>
        </div>
      </div>

      <div className="space-x-4">
        <Link href="/sign-up" legacyBehavior>
          <a className="px-8 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
            Get Started
          </a>
        </Link>
        <Link href="/dashboard" legacyBehavior>
          <a className="px-8 py-3 text-lg font-medium text-blue-600 bg-transparent hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700 border border-blue-600 dark:border-blue-400 rounded-md transition-colors">
            Go to Dashboard
          </a>
        </Link>
      </div>
      {/* You can add more sections here like Features, Testimonials, etc. */}
    </div>
  );
}
