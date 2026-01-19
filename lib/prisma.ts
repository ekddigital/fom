import { PrismaClient } from "@prisma/client";
import { prismaWithPasswordHashing } from "./prisma-extensions";

const globalForPrisma = globalThis as unknown as {
  prisma: typeof prismaWithPasswordHashing | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["warn", "error"],
    // Improved connection configuration
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // Better error handling
    errorFormat: "pretty",
  }).$extends({
    query: {
      user: {
        // Hash password on create
        async create({ args, query }) {
          if (
            args.data.password &&
            typeof args.data.password === "string" &&
            !args.data.password.startsWith("$2")
          ) {
            const bcrypt = await import("bcryptjs");
            console.log("🔐 Auto-hashing password on user creation");
            args.data.password = await bcrypt.hash(args.data.password, 12);
          }
          return query(args);
        },

        // Hash password on update
        async update({ args, query }) {
          if (
            args.data.password &&
            typeof args.data.password === "string" &&
            !args.data.password.startsWith("$2")
          ) {
            const bcrypt = await import("bcryptjs");
            console.log("🔐 Auto-hashing password on user update");
            args.data.password = await bcrypt.hash(args.data.password, 12);
          }
          return query(args);
        },

        // Hash password on upsert
        async upsert({ args, query }) {
          if (
            args.create.password &&
            typeof args.create.password === "string" &&
            !args.create.password.startsWith("$2")
          ) {
            const bcrypt = await import("bcryptjs");
            console.log("🔐 Auto-hashing password on user upsert (create)");
            args.create.password = await bcrypt.hash(args.create.password, 12);
          }
          if (
            args.update.password &&
            typeof args.update.password === "string" &&
            !args.update.password.startsWith("$2")
          ) {
            const bcrypt = await import("bcryptjs");
            console.log("🔐 Auto-hashing password on user upsert (update)");
            args.update.password = await bcrypt.hash(args.update.password, 12);
          }
          return query(args);
        },
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
