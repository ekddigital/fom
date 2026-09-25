import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getPublishedPrayerSession = cache(async (slug: string) => {
  try {
    return await prisma.prayerFasting.findFirst({
      where: { slug, isPublished: true },
    });
  } catch {
    return null;
  }
});

export async function listPublishedPrayerSessions(): Promise<
  { slug: string; updatedAt: Date }[]
> {
  try {
    return await prisma.prayerFasting.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
  } catch {
    return [];
  }
}
