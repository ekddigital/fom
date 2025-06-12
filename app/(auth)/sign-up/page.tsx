"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Loader2,
  Check,
  X,
  UserCheck,
} from "lucide-react";
import { useAuth } from "@/lib/hooks/use-auth";
import { MINISTRY_INTERESTS } from "@/lib/types/auth";
import { z } from "zod";
import { debounce } from "lodash";

const signUpSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name must be less than 50 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name must be less than 50 characters"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be less than 30 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      )
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const { signUp, signInWithGoogle, checkUsernameAvailability, isLoading } =
    useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    username: "",
    ministryInterests: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");

  // Create the username check function
  const checkUsername = useCallback(async (username: string) => {
    if (username.length >= 3) {
      setUsernameStatus("checking");
      const available = await checkUsernameAvailability(username);
      setUsernameStatus(available ? "available" : "taken");

      if (!available) {
        setErrors((prev) => ({
          ...prev,
          username: "This username is already taken",
        }));
      } else {
        setErrors((prev) => ({ ...prev, username: "" }));
      }
    } else {
      setUsernameStatus("idle");
    }
  }, []);

  // Debounced username check
  const debouncedUsernameCheck = useMemo(
    () => debounce(checkUsername, 500),
    [checkUsername]
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    setGeneralError("");

    // Check username availability
    if (field === "username") {
      setUsernameStatus("idle");
      if (value) {
        debouncedUsernameCheck(value);
      }
    }
  };

  const handleMinistryInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      ministryInterests: prev.ministryInterests.includes(interest)
        ? prev.ministryInterests.filter((i) => i !== interest)
        : [...prev.ministryInterests, interest],
    }));
  };

  const validateForm = () => {
    try {
      const dataToValidate = {
        ...formData,
        username: formData.username || undefined,
      };
      signUpSchema.parse(dataToValidate);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (formData.username && usernameStatus === "taken") {
      setErrors((prev) => ({
        ...prev,
        username: "Please choose a different username",
      }));
      return;
    }

    const result = await signUp({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username || undefined,
      ministryInterests: formData.ministryInterests,
    });

    if (!result.success) {
      if (result.errors) {
        // Convert string[] to string by taking the first error message
        const convertedErrors: Record<string, string> = {};
        Object.entries(result.errors).forEach(([key, value]) => {
          convertedErrors[key] = Array.isArray(value) ? value[0] : value;
        });
        setErrors(convertedErrors);
      } else {
        setGeneralError(result.message || "Registration failed");
      }
    }
  };

  const handleGoogleSignUp = async () => {
    const result = await signInWithGoogle();
    if (!result.success) {
      setGeneralError(result.message || "Google sign-up failed");
    }
  };

  const getUsernameIcon = () => {
    switch (usernameStatus) {
      case "checking":
        return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
      case "available":
        return <Check className="w-4 h-4 text-green-500" />;
      case "taken":
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full border-0 shadow-xl">
      <CardHeader className="space-y-4 text-center">
        <CardTitle className="text-2xl font-bold text-fom-primary">
          Join Our Ministry
        </CardTitle>
        <CardDescription className="text-base">
          Create your Fishers of Men account and join our global community
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {generalError && (
          <Alert variant="destructive">
            <AlertDescription>{generalError}</AlertDescription>
          </Alert>
        )}

        {/* Google Sign Up */}
        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 text-base"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or create account with email
              </span>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  className={`pl-10 h-11 ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  disabled={isLoading}
                />
              </div>
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  className={`pl-10 h-11 ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  disabled={isLoading}
                />
              </div>
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className={`pl-10 h-11 ${errors.email ? "border-red-500" : ""}`}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Username (Optional)
            </Label>
            <div className="relative">
              <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                className={`pl-10 pr-10 h-11 ${
                  errors.username || usernameStatus === "taken"
                    ? "border-red-500"
                    : usernameStatus === "available"
                    ? "border-green-500"
                    : ""
                }`}
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {getUsernameIcon()}
              </div>
            </div>
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
            {usernameStatus === "available" && (
              <p className="text-sm text-green-600">✓ Username is available</p>
            )}
          </div>

          {/* Password Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className={`pl-10 pr-10 h-11 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={`pl-10 pr-10 h-11 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Ministry Interests */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Ministry Interests (Optional)
            </Label>
            <p className="text-xs text-gray-600">
              Select areas where you&apos;d like to serve or learn more about:
            </p>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {MINISTRY_INTERESTS.map((interest) => (
                <Badge
                  key={interest}
                  variant={
                    formData.ministryInterests.includes(interest)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer hover:bg-fom-primary/10 transition-colors"
                  onClick={() => handleMinistryInterestToggle(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-base bg-fom-primary hover:bg-fom-primary/90"
            disabled={
              isLoading ||
              Boolean(formData.username && usernameStatus === "taken")
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-fom-primary hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
