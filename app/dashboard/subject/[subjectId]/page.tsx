// app/dashboard/subject/[subjectId]/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ProgressStatus } from "@prisma/client";

// Define types for the subject details
interface Topic {
  id: string;
  title: string;
  description?: string | null;
  content_url?: string | null;
  status?: ProgressStatus; // Only present for students
}

interface Chapter {
  id: string;
  title: string;
  description?: string | null;
  topics: Topic[];
}

interface SubjectDetails {
  id: string;
  title: string;
  description?: string | null;
  chapters: Chapter[];
}

async function getSubjectDetails(
  subjectId: string,
  userId: string | undefined // Clerk User ID
): Promise<SubjectDetails | null> {
  if (!userId) return null;

  // Construct the absolute URL for server-side fetch
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/subjects/${subjectId}/details`;

  try {
    const response = await fetch(apiUrl, {
      cache: "no-store",
      // credentials: "include", // Not needed for server-to-server, auth is via headers or direct context
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch subject details: ${response.status} ${response.statusText}`,
        `URL: ${apiUrl}`
      );
      const errorBody = await response.text();
      console.error("Error body:", errorBody);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching subject details:", error, `URL: ${apiUrl}`);
    return null;
  }
}

function getStatusBadgeVariant(
  status?: ProgressStatus
): "default" | "secondary" | "outline" | "destructive" {
  switch (status) {
    case ProgressStatus.COMPLETED:
      return "default"; // Was "success"
    case ProgressStatus.IN_PROGRESS:
      return "secondary"; // Was "warning"
    case ProgressStatus.NOT_STARTED:
      return "outline"; // Was "secondary", changed to outline for better distinction
    default:
      return "outline";
  }
}

export default async function SubjectDetailPage({
  params: paramsProp, // Rename to avoid conflict if we await params directly
}: {
  params: { subjectId: string };
}) {
  // Await params if necessary, though often direct destructuring is fine if not reassigning params itself.
  // For this specific error, Next.js wants to ensure params isn't used before it's fully resolved.
  // A simple way is to ensure it's treated as potentially async, even if just by re-referencing.
  const params = await Promise.resolve(paramsProp);
  const { subjectId } = params;

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
    return null;
  }

  const subjectDetails = await getSubjectDetails(subjectId, user.id);

  if (!subjectDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Subject Not Found</h1>
        <p>
          The subject you are looking for could not be found or there was an
          error fetching its details.
        </p>
        <Link
          href="/dashboard"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          &larr; Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/dashboard"
        className="text-blue-500 hover:underline mb-6 inline-block"
      >
        &larr; Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold mb-2">{subjectDetails.title}</h1>
      {subjectDetails.description && (
        <p className="text-lg text-muted-foreground mb-8">
          {subjectDetails.description}
        </p>
      )}

      {subjectDetails.chapters.length === 0 ? (
        <p>This subject currently has no chapters.</p>
      ) : (
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue={`chapter-${subjectDetails.chapters[0]?.id}`}
        >
          {subjectDetails.chapters.map((chapter, index) => (
            <AccordionItem value={`chapter-${chapter.id}`} key={chapter.id}>
              <AccordionTrigger className="text-xl hover:no-underline">
                Chapter {index + 1}: {chapter.title}
              </AccordionTrigger>
              <AccordionContent className="pl-4 pt-2 pb-4">
                {chapter.description && (
                  <p className="text-md text-muted-foreground mb-4 italic">
                    {chapter.description}
                  </p>
                )}
                {chapter.topics.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No topics in this chapter yet.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {chapter.topics.map((topic) => (
                      <li
                        key={topic.id}
                        className="flex justify-between items-center p-3 bg-card border rounded-md shadow-sm"
                      >
                        <div>
                          <span className="text-md font-medium">
                            {topic.title}
                          </span>
                          {topic.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {topic.description}
                            </p>
                          )}
                        </div>
                        {topic.status && (
                          <Badge
                            variant={getStatusBadgeVariant(topic.status)}
                            className="capitalize"
                          >
                            {topic.status.replace(/_/g, " ").toLowerCase()}
                          </Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
