// app/api/auth/webhooks/clerk/route.ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  if (!webhookSecret) {
    console.error("CLERK_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Internal Server Error: Webhook secret not configured" },
      { status: 500 }
    );
  }

  const payload = await req.json();
  const payloadString = JSON.stringify(payload);
  const headerPayload = await headers(); // Corrected: Await the headers() call
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 }
    );
  }

  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(payloadString, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err: unknown) {
    console.error(
      "Error verifying webhook:",
      err instanceof Error ? err.message : String(err)
    );
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }

  const eventType = evt.type;
  console.log(`Received webhook event: ${eventType}`);

  try {
    if (eventType === "user.created") {
      const {
        id: clerkId, // Renamed for clarity
        email_addresses,
        first_name,
        last_name,
        image_url,
        created_at,
        updated_at,
      } = evt.data;
      const primaryEmail = email_addresses?.find(
        (email) => email.id === evt.data.primary_email_address_id
      )?.email_address;

      if (!primaryEmail) {
        console.error(
          "Primary email not found for user.created event for Clerk ID:",
          clerkId
        );
        return NextResponse.json(
          { error: "Primary email not found" },
          { status: 400 }
        );
      }

      // Try to find an existing user by email
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email: primaryEmail },
      });

      if (existingUserByEmail) {
        if (!existingUserByEmail.clerk_id) {
          // User exists by email and doesn't have a clerk_id, link them
          await prisma.user.update({
            where: { id: existingUserByEmail.id }, // Use the internal DB ID
            data: {
              clerk_id: clerkId,
              name:
                `${first_name || ""} ${last_name || ""}`.trim() ||
                existingUserByEmail.name ||
                null,
              avatar_url: image_url || existingUserByEmail.avatar_url,
              // email is already matched
              updated_at: new Date(updated_at),
              // created_at remains the original local creation time
              // role remains the existing local role
            },
          });
          console.log(
            `User.created: Existing user with email ${primaryEmail} (DB ID: ${existingUserByEmail.id}) linked to Clerk ID ${clerkId}.`
          );
        } else if (existingUserByEmail.clerk_id !== clerkId) {
          // User exists by email but is linked to a DIFFERENT clerk_id. This is a conflict.
          console.warn(
            `User.created: Conflict - User with email ${primaryEmail} (DB ID: ${existingUserByEmail.id}) already exists with Clerk ID ${existingUserByEmail.clerk_id}. New event for Clerk ID ${clerkId}. Manual review needed.`
          );
          // Acknowledge webhook but indicate conflict. Avoid creating duplicate or overwriting.
          return NextResponse.json(
            {
              message:
                "Conflict: User with this email already linked to a different Clerk account.",
            },
            { status: 200 }
          );
        } else {
          // User exists by email and is already linked to THIS clerk_id.
          // This shouldn't typically happen for a 'user.created' event. Refresh data.
          await prisma.user.update({
            where: { clerk_id: clerkId }, // or where: { id: existingUserByEmail.id }
            data: {
              name:
                `${first_name || ""} ${last_name || ""}`.trim() ||
                existingUserByEmail.name ||
                null,
              avatar_url: image_url || existingUserByEmail.avatar_url,
              updated_at: new Date(updated_at),
            },
          });
          console.log(
            `User.created: User ${clerkId} (email: ${primaryEmail}) data refreshed (already linked).`
          );
        }
      } else {
        // No user found by email, create a new one
        await prisma.user.create({
          data: {
            clerk_id: clerkId,
            email: primaryEmail,
            name: `${first_name || ""} ${last_name || ""}`.trim() || null,
            avatar_url: image_url,
            // role is STUDENT by default as per schema
            created_at: new Date(created_at),
            updated_at: new Date(updated_at),
          },
        });
        console.log(
          `User.created: New user ${clerkId} created in DB with email ${primaryEmail}.`
        );
      }
    } else if (eventType === "user.updated") {
      const {
        id: clerkId, // Renamed for clarity
        email_addresses,
        first_name,
        last_name,
        image_url,
        updated_at,
        // created_at is also available if needed for the "create if not found" case
      } = evt.data;
      const primaryEmail = email_addresses?.find(
        (email) => email.id === evt.data.primary_email_address_id
      )?.email_address;

      if (!primaryEmail) {
        console.error(
          "Primary email not found for user.updated event for Clerk ID:",
          clerkId
        );
        return NextResponse.json(
          { error: "Primary email not found" },
          { status: 400 }
        );
      }

      let userToUpdate = await prisma.user.findUnique({
        where: { clerk_id: clerkId },
      });

      if (!userToUpdate) {
        // Not found by clerk_id, try to find by email to link an unlinked account
        console.log(
          `User.updated: User with Clerk ID ${clerkId} not found. Attempting to find by email ${primaryEmail} to link.`
        );
        const existingUserByEmail = await prisma.user.findUnique({
          where: { email: primaryEmail },
        });

        if (existingUserByEmail) {
          if (!existingUserByEmail.clerk_id) {
            // Found by email, and it's not linked. Link it.
            userToUpdate = await prisma.user.update({
              where: { id: existingUserByEmail.id },
              data: {
                clerk_id: clerkId, // Link to this clerk_id
                name:
                  `${first_name || ""} ${last_name || ""}`.trim() ||
                  existingUserByEmail.name ||
                  null,
                avatar_url: image_url || existingUserByEmail.avatar_url,
                // email is already matched
                updated_at: new Date(updated_at),
                // Keep existing role and created_at
              },
            });
            console.log(
              `User.updated: Existing user with email ${primaryEmail} (DB ID: ${existingUserByEmail.id}) linked to Clerk ID ${clerkId}.`
            );
          } else if (existingUserByEmail.clerk_id !== clerkId) {
            // Found by email, but it's linked to a DIFFERENT clerk_id. Conflict.
            console.warn(
              `User.updated: Conflict - User with email ${primaryEmail} (DB ID: ${existingUserByEmail.id}) already exists with Clerk ID ${existingUserByEmail.clerk_id}. Update event for Clerk ID ${clerkId} cannot be safely applied. Manual review needed.`
            );
            return NextResponse.json(
              {
                message:
                  "Conflict: User with this email already linked to a different Clerk account. Update ignored.",
              },
              { status: 200 }
            );
          } else {
            // Found by email and it's the SAME clerk_id. This means the earlier findUnique by clerk_id should have found it.
            // This path should ideally not be hit if data is consistent.
            // However, if it is, userToUpdate is still null, so we assign existingUserByEmail to it.
            userToUpdate = existingUserByEmail;
            console.log(
              `User.updated: User with Clerk ID ${clerkId} found via email ${primaryEmail} after initial miss. Proceeding with update.`
            );
          }
        }
      }

      if (userToUpdate) {
        // User found by clerk_id or successfully linked/found by email
        await prisma.user.update({
          where: { id: userToUpdate.id }, // Use internal DB ID for update
          data: {
            email: primaryEmail, // Update email in case it changed
            name:
              `${first_name || ""} ${last_name || ""}`.trim() ||
              userToUpdate.name ||
              null,
            avatar_url: image_url || userToUpdate.avatar_url,
            updated_at: new Date(updated_at),
          },
        });
        console.log(
          `User.updated: User ${clerkId} (DB ID: ${userToUpdate.id}) updated in DB.`
        );
      } else {
        // Still no user found by clerk_id or by email (or email linking failed due to conflict and we chose not to proceed)
        // This case means we should create the user if they truly don't exist and there wasn't a conflict preventing it.
        // The original code had a "create if not found" logic here. Let's refine it.
        // If we reached here, it means no existing user could be definitively matched or linked without conflict.
        // So, create a new user record associated with this clerkId.
        // This assumes clerk_id should be unique. If a user with this clerk_id already exists (e.g. due to race condition or missed webhook),
        // prisma.create would fail if clerk_id has a unique constraint.
        // For safety, let's double check if a user with this clerk_id was created by another process in the meantime.
        const finalCheckUser = await prisma.user.findUnique({
          where: { clerk_id: clerkId },
        });
        if (finalCheckUser) {
          console.log(
            `User.updated: User ${clerkId} was found upon final check. Update logic might have already handled or created it. Skipping redundant creation.`
          );
        } else {
          const { created_at } = evt.data; // Clerk provides original creation time
          await prisma.user.create({
            data: {
              clerk_id: clerkId,
              email: primaryEmail,
              name: `${first_name || ""} ${last_name || ""}`.trim() || null,
              avatar_url: image_url,
              created_at: new Date(created_at), // Use original creation time from Clerk
              updated_at: new Date(updated_at),
              // role will be default (STUDENT)
            },
          });
          console.log(
            `User.updated: User ${clerkId} was not found by clerk_id or email, so created in DB.`
          );
        }
      }
    } else if (eventType === "user.deleted") {
      const { id } = evt.data;
      if (!id) {
        console.error("User ID not found for user.deleted event");
        return NextResponse.json(
          { error: "User ID not found" },
          { status: 400 }
        );
      }
      // It's possible the user was deleted from Clerk before being created in your DB
      // So, we use deleteMany which doesn't throw an error if the record is not found.
      const deleteResult = await prisma.user.deleteMany({
        where: { clerk_id: id },
      });
      if (deleteResult.count > 0) {
        console.log(`User ${id} deleted from DB.`);
      } else {
        console.log(
          `User ${id} not found in DB for deletion, or already deleted.`
        );
      }
    } else {
      console.log(`Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    console.error(
      `Error processing webhook event ${eventType}:`,
      error instanceof Error ? error.message : String(error)
    );
    // It's good practice to avoid sending detailed error messages to the client for security reasons.
    // Log the detailed error on the server and send a generic error message to the client.
    return NextResponse.json(
      { error: "Internal server error while processing webhook" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
