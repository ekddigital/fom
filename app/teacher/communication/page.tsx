// app/teacher/communication/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function StudentCommunicationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Student Communication
        </h1>
        <Link href="/teacher" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Teacher Dashboard
          </Button>
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Feature Coming Soon
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The ability to send announcements or messages to your students is
          currently under development. Check back later for updates!
        </p>
        {/* Placeholder for future content, e.g., a message composer or list of announcements */}
      </div>
    </div>
  );
}
