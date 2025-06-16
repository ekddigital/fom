"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { XCircle, RefreshCw, Mail, Home } from "lucide-react";
import { Suspense } from "react";

const ERROR_MESSAGES = {
  invalid_verification_link: {
    title: "Invalid Verification Link",
    description: "The verification link is malformed or incomplete.",
    action: "Request a new verification email",
  },
  invalid_verification_token: {
    title: "Invalid Verification Token",
    description: "The verification token is invalid or doesn't exist.",
    action: "Request a new verification email",
  },
  verification_token_expired: {
    title: "Verification Link Expired",
    description:
      "Your verification link has expired. Verification links are valid for 24 hours.",
    action: "Request a new verification email",
  },
  user_not_found: {
    title: "User Not Found",
    description:
      "We couldn't find an account associated with this verification request.",
    action: "Create a new account",
  },
  verification_failed: {
    title: "Verification Failed",
    description:
      "Something went wrong during the verification process. Please try again.",
    action: "Request a new verification email",
  },
  default: {
    title: "Authentication Error",
    description: "An unexpected error occurred. Please try again later.",
    action: "Go to homepage",
  },
};

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "default";
  const errorInfo =
    ERROR_MESSAGES[error as keyof typeof ERROR_MESSAGES] ||
    ERROR_MESSAGES.default;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-red-800">
          {errorInfo.title}
        </CardTitle>
        <CardDescription className="text-base">
          {errorInfo.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {" "}
        <Alert>
          <AlertDescription>
            Don&apos;t worry! This is a common issue that can be easily
            resolved.
          </AlertDescription>
        </Alert>
        <div className="space-y-3">
          {(error === "invalid_verification_token" ||
            error === "verification_token_expired" ||
            error === "verification_failed") && (
            <Button asChild className="w-full">
              <Link href="/auth/resend-verification">
                <Mail className="w-4 h-4 mr-2" />
                Request New Verification Email
              </Link>
            </Button>
          )}

          {error === "user_not_found" && (
            <Button asChild className="w-full">
              <Link href="/sign-up">
                <RefreshCw className="w-4 h-4 mr-2" />
                Create New Account
              </Link>
            </Button>
          )}

          <Button asChild variant="outline" className="w-full">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Link>
          </Button>

          <Button asChild variant="ghost" className="w-full">
            <Link href="/sign-in">Try Signing In</Link>
          </Button>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Need help? Contact our support team.
          </p>
          <Button asChild variant="link" size="sm">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 px-4">
      <Suspense
        fallback={
          <Card className="w-full max-w-md">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Loading...
              </CardTitle>
            </CardHeader>
          </Card>
        }
      >
        <AuthErrorContent />
      </Suspense>
    </div>
  );
}
