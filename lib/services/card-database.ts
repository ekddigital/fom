/**
 * Card Database Service
 * Handles card template and card CRUD operations
 */

import { prisma } from "../prisma";
import { CARD_TEMPLATES } from "../utils/card-templates";
import type {
  CardCategory,
  CardStatus,
  CardTemplate,
  Card,
} from "@prisma/client";

export class CardDatabaseService {
  /**
   * Seed card templates in the database
   */
  static async seedCardTemplates(
    forceOverride = false,
    updatedBy?: string
  ): Promise<void> {
    console.log("📋 Seeding card templates...");

    try {
      // Get or create admin user first (outside transaction)
      let adminUser;
      if (updatedBy) {
        adminUser = await prisma.user.findUnique({
          where: { email: updatedBy },
        });

        // Check if the provided user has admin privileges
        if (adminUser && !["ADMIN", "SUPER_ADMIN"].includes(adminUser.role)) {
          console.warn(
            `⚠️ User ${updatedBy} does not have admin privileges (role: ${adminUser.role})`
          );
          adminUser = null; // Reset to find another admin
        }
      }
      if (!adminUser) {
        // Find any admin or super admin
        adminUser = await prisma.user.findFirst({
          where: {
            role: {
              in: ["ADMIN", "SUPER_ADMIN"],
            },
          },
        });
      }
      if (!adminUser) {
        console.warn("⚠️ No admin user found for card template creation");
        console.warn(
          "⚠️ Creating a temporary admin user for template seeding..."
        );
        // Create a temporary admin user for seeding purposes
        try {
          adminUser = await prisma.user.create({
            data: {
              id: "system-admin-" + Date.now(),
              email: "system@jicf.org",
              firstName: "System",
              lastName: "Admin",
              username: "systemadmin",
              role: "SUPER_ADMIN",
              displayNamePreference: "FULL_NAME",
              profileVisibility: "MEMBERS_ONLY",
            },
          });
          console.log("✅ Created temporary system admin user for seeding");
        } catch (createError) {
          console.error(
            "❌ Failed to create temporary admin user:",
            createError
          );
          return;
        }
      }

      console.log(
        `🔑 Using admin user: ${adminUser.firstName} ${adminUser.lastName} (${adminUser.email})`
      );

      // Process each template individually to avoid transaction timeout
      for (const template of CARD_TEMPLATES) {
        try {
          const templateData = {
            elements: template.elements,
            settings: template.settings,
            category: template.category,
            description: template.description,
          };

          // Type assertion for Prisma JSON field
          const templateJson = templateData as unknown as object;

          if (forceOverride) {
            // Use upsert with individual operation
            const upsertedTemplate = await prisma.cardTemplate.upsert({
              where: { id: template.id },
              update: {
                name: template.name,
                description: template.description,
                category: template.category.toUpperCase() as CardCategory,
                templateData: templateJson,
                updatedAt: new Date(),
              },
              create: {
                id: template.id,
                name: template.name,
                description: template.description,
                category: template.category.toUpperCase() as CardCategory,
                status: "ACTIVE" as CardStatus,
                templateData: templateJson,
                createdBy: adminUser.id,
              },
            });

            console.log(
              `🔄 Upserted card template: ${upsertedTemplate.name} (ID: ${upsertedTemplate.id})`
            );
          } else {
            // Only create if doesn't exist
            const existingTemplate = await prisma.cardTemplate.findUnique({
              where: { id: template.id },
            });

            if (!existingTemplate) {
              const newTemplate = await prisma.cardTemplate.create({
                data: {
                  id: template.id,
                  name: template.name,
                  description: template.description,
                  category: template.category.toUpperCase() as CardCategory,
                  status: "ACTIVE" as CardStatus,
                  templateData: templateJson,
                  createdBy: adminUser.id,
                },
              });

              console.log(
                `✨ Created new card template: ${newTemplate.name} (ID: ${newTemplate.id})`
              );
            } else {
              console.log(
                `⏭️ Card template already exists: ${existingTemplate.name} (ID: ${existingTemplate.id})`
              );
            }
          }
        } catch (templateError) {
          console.error(
            `❌ Failed to process template ${template.id}:`,
            templateError
          );
          // Continue with other templates instead of failing completely
        }
      }

      console.log("✅ Card template seeding completed successfully");
    } catch (error) {
      console.error("❌ Card template seeding failed:", error);
      throw error;
    }
  }

  /**
   * Get all card templates
   */
  static async getCardTemplates(): Promise<CardTemplate[]> {
    return await prisma.cardTemplate.findMany({
      where: { status: "ACTIVE" },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        _count: {
          select: {
            cards: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Get card template by ID
   */
  static async getCardTemplate(id: string): Promise<CardTemplate | null> {
    return await prisma.cardTemplate.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Create a new card from template
   */ static async createCard(data: {
    templateId: string;
    recipientName?: string;
    customMessage?: string;
    createdBy: string;
    // Additional fields for special cards
    serviceOutline?: string;
    eventName?: string;
    eventDate?: string;
    mcName?: string;
    graduatesList?: string;
    meetOurGraduatesData?: string;
  }): Promise<Card> {
    return await prisma.$transaction(async (tx) => {
      // Verify template exists
      const template = await tx.cardTemplate.findUnique({
        where: { id: data.templateId },
      });

      if (!template) {
        throw new Error(`Card template with ID ${data.templateId} not found`);
      }

      // Generate unique card ID
      const cardId = `JICF-${new Date().getFullYear()}-CARD-${Date.now()
        .toString()
        .slice(-6)}`; // Create the card
      const card = await tx.card.create({
        data: {
          id: cardId,
          templateId: data.templateId,
          recipientName: data.recipientName,
          customMessage: data.customMessage,
          serviceOutline: data.serviceOutline,
          eventName: data.eventName,
          eventDate: data.eventDate,
          mcName: data.mcName,
          graduatesList: data.graduatesList,
          meetOurGraduatesData: data.meetOurGraduatesData,
          createdBy: data.createdBy,
        },
        include: {
          template: true,
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      console.log(
        `✨ Created new card: ${card.id} using template: ${template.name}`
      );
      return card;
    });
  }

  /**
   * Get card by ID
   */
  static async getCard(id: string): Promise<Card | null> {
    return await prisma.card.findUnique({
      where: { id },
      include: {
        template: true,
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Get cards by user
   */
  static async getCardsByUser(userId: string): Promise<Card[]> {
    return await prisma.card.findMany({
      where: { createdBy: userId },
      include: {
        template: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Update card download count
   */
  static async incrementDownloadCount(cardId: string): Promise<void> {
    await prisma.card.update({
      where: { id: cardId },
      data: {
        downloadCount: {
          increment: 1,
        },
      },
    });
  }

  /**
   * Update card view count
   */
  static async incrementViewCount(cardId: string): Promise<void> {
    await prisma.card.update({
      where: { id: cardId },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  }

  /**
   * Delete card
   */
  static async deleteCard(id: string): Promise<void> {
    await prisma.card.delete({
      where: { id },
    });
  }

  /**
   * Get card analytics
   */
  static async getCardAnalytics(): Promise<{
    totalCards: number;
    totalDownloads: number;
    totalViews: number;
    templateUsage: Array<{
      templateName: string;
      cardCount: number;
      totalDownloads: number;
    }>;
  }> {
    const [totalCards, downloadStats, templateStats] = await Promise.all([
      prisma.card.count(),
      prisma.card.aggregate({
        _sum: {
          downloadCount: true,
          viewCount: true,
        },
      }),
      prisma.card.groupBy({
        by: ["templateId"],
        _count: {
          id: true,
        },
        _sum: {
          downloadCount: true,
        },
      }),
    ]);

    // Get template names for the stats
    const templates = await prisma.cardTemplate.findMany({
      where: {
        id: {
          in: templateStats.map((stat) => stat.templateId),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const templateUsage = templateStats.map((stat) => {
      const template = templates.find((t) => t.id === stat.templateId);
      return {
        templateName: template?.name || "Unknown Template",
        cardCount: stat._count.id,
        totalDownloads: stat._sum.downloadCount || 0,
      };
    });

    return {
      totalCards,
      totalDownloads: downloadStats._sum.downloadCount || 0,
      totalViews: downloadStats._sum.viewCount || 0,
      templateUsage,
    };
  }
}
