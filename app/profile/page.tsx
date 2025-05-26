"use client";

import { UserProfile, useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

// Zod schema for profile update form (subset of what API accepts)
const profileFormSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").max(255),
  avatar_url: z
    .string()
    .url("Invalid URL for avatar")
    .or(z.literal(""))
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface UserDetails {
  id: string;
  clerk_id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

const UserProfilePage: NextPage = () => {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState<ProfileFormValues>({
    name: "",
    avatar_url: "",
  });
  const [errors, setErrors] = useState<z.ZodError<ProfileFormValues> | null>(
    null
  );

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.id) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/users/${user.id}/details`);
          if (!response.ok) {
            throw new Error("Failed to fetch user details");
          }
          const data: UserDetails = await response.json();
          setUserDetails(data);
          setFormData({
            name: data.name || "",
            avatar_url: data.avatar_url || "",
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
          toast.error("Could not load your profile details.");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchUserDetails();
  }, [user?.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors) {
      // Clear errors when user starts typing
      setErrors(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) return;

    const validationResult = profileFormSchema.safeParse(formData);
    if (!validationResult.success) {
      setErrors(validationResult.error);
      toast.error("Please correct the errors in the form.");
      return;
    }
    setErrors(null);
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/users/${user.id}/details`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validationResult.data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      const updatedData: UserDetails = await response.json();
      setUserDetails(updatedData);
      setFormData({
        name: updatedData.name || "",
        avatar_url: updatedData.avatar_url || "",
      });

      // IMPORTANT: Refresh Clerk's user session data and wait for it to complete
      if (user) {
        await user.reload();
      }

      toast.success("Profile updated successfully!");
      // The user.reload() call was previously here and not awaited.
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading && !userDetails) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <p className="text-gray-700 dark:text-gray-300">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Manage Your Profile
      </h1>

      {/* Custom Profile Update Form */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8 mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
          Update Your Details
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Use this section to change your display name and avatar. Other account
          settings can be managed below.
        </p>
        {userDetails ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Display Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
              {errors?.flatten().fieldErrors?.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.flatten().fieldErrors.name?.join(", ")}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="avatar_url"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Avatar URL
              </label>
              <input
                type="text"
                name="avatar_url"
                id="avatar_url"
                value={formData.avatar_url}
                onChange={handleChange}
                placeholder="https://example.com/avatar.png"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
              {errors?.flatten().fieldErrors?.avatar_url && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.flatten().fieldErrors.avatar_url?.join(", ")}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email (managed by Clerk)
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={userDetails.email}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700/50 sm:text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Role
              </label>
              <input
                type="text"
                name="role"
                id="role"
                value={
                  userDetails.role.charAt(0).toUpperCase() +
                  userDetails.role.slice(1)
                }
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700/50 sm:text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 dark:focus:ring-offset-gray-800"
            >
              {isUpdating ? "Updating..." : "Save Changes"}
            </button>
          </form>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Could not load profile data to edit.
          </p>
        )}
      </div>

      {/* Clerk's UserProfile Component for other settings */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
          Account Settings (via Clerk)
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          For security settings, connected accounts, and other advanced options,
          please use the interface below.
        </p>
        <UserProfile
          path="/profile"
          routing="path"
          appearance={{
            elements: {
              card: "bg-transparent dark:bg-transparent shadow-none border-none w-full p-0 overflow-hidden",
            },
          }}
        />
      </div>
    </div>
  );
};

export default UserProfilePage;
