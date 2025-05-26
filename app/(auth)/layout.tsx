import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Study Tracker</h1>
        <p className="text-blue-100 dark:text-blue-200 mt-2">
          Sign in or create an account to manage your progress.
        </p>
      </div>
      <div className="p-8 bg-white dark:bg-gray-800 shadow-xl rounded-lg w-full max-w-md">
        {children}
      </div>
      <p className="text-center text-xs text-blue-100 dark:text-blue-300 mt-8">
        © {new Date().getFullYear()} Study Progress Tracker. All rights
        reserved.
      </p>
    </div>
  );
}
