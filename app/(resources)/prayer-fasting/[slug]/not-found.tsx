import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Prayer & Fasting Session Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The prayer and fasting session you&apos;re looking for doesn&apos;t
          exist or has been removed.
        </p>
        <Link href="/prayer-fasting">
          <Button className="bg-blue-950 hover:bg-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Prayer & Fasting
          </Button>
        </Link>
      </div>
    </div>
  );
}
