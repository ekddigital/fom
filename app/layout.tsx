import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Inter } from "next/font/google"; // Using Inter font for a clean look
import "./globals.css";
import Footer from "../components/layout/Footer";
import { Toaster } from "@/components/ui/sonner"; // Added import for Toaster
import AdminDashboardLink from "@/components/layout/AdminDashboardLink"; // Import the new component
import TeacherDashboardLink from "@/components/layout/TeacherDashboardLink"; // Import the TeacherDashboardLink component

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Study Progress Tracker", // Updated title
  description:
    "Track your learning journey, set goals, and achieve academic success.", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable}`}>
        <body
          className={`font-inter antialiased flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        >
          <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 backdrop-blur-lg">
            <div className="container mx-auto px-4 h-16 flex justify-between items-center">
              <Link
                href="/"
                className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
              >
                Study Tracker
              </Link>
              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 ease-in-out">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-150 ease-in-out">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <AdminDashboardLink />
                  <TeacherDashboardLink />
                  {/* Explicit Profile Link */}
                  <Link
                    href="/profile"
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 ease-in-out"
                  >
                    My Profile
                  </Link>
                  <UserButton afterSignOutUrl="/" userProfileUrl="/profile" />
                </SignedIn>
              </div>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
          <Toaster /> {/* Added Toaster component */}
        </body>
      </html>
    </ClerkProvider>
  );
}
