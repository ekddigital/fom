/**
 * Prisma Extensions for Automatic Password Hashing
 * This extends Prisma to automatically hash passwords when they're set
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Check if a string is already hashed (bcrypt hashes start with $2a$, $2b$, or $2y$)
 */
function isAlreadyHashed(password: string | null | undefined): boolean {
  return Boolean(
    password &&
      (password.startsWith("$2a$") ||
        password.startsWith("$2b$") ||
        password.startsWith("$2y$"))
  );
}

/**
 * Extended Prisma client with automatic password hashing
 */
export const prismaWithPasswordHashing = new PrismaClient().$extends({
  query: {
    user: {
      // Hash password on create
      async create({ args, query }) {
        if (
          args.data.password &&
          typeof args.data.password === "string" &&
          !isAlreadyHashed(args.data.password)
        ) {
          console.log("🔐 Auto-hashing password on user creation");
          args.data.password = await bcrypt.hash(
            args.data.password,
            SALT_ROUNDS
          );
        }
        return query(args);
      },

      // Hash password on update
      async update({ args, query }) {
        if (
          args.data.password &&
          typeof args.data.password === "string" &&
          !isAlreadyHashed(args.data.password)
        ) {
          console.log("🔐 Auto-hashing password on user update");
          args.data.password = await bcrypt.hash(
            args.data.password,
            SALT_ROUNDS
          );
        }
        return query(args);
      },

      // Hash password on upsert
      async upsert({ args, query }) {
        if (
          args.create.password &&
          typeof args.create.password === "string" &&
          !isAlreadyHashed(args.create.password)
        ) {
          console.log("🔐 Auto-hashing password on user upsert (create)");
          args.create.password = await bcrypt.hash(
            args.create.password,
            SALT_ROUNDS
          );
        }
        if (
          args.update.password &&
          typeof args.update.password === "string" &&
          !isAlreadyHashed(args.update.password)
        ) {
          console.log("🔐 Auto-hashing password on user upsert (update)");
          args.update.password = await bcrypt.hash(
            args.update.password,
            SALT_ROUNDS
          );
        }
        return query(args);
      },
    },
  },
});

/**
 * Utility functions for password management
 */
export const passwordUtils = {
  /**
   * Hash a password manually
   */
  async hash(password: string): Promise<string> {
    if (isAlreadyHashed(password)) {
      return password;
    }
    return await bcrypt.hash(password, SALT_ROUNDS);
  },

  /**
   * Verify a password against a hash
   */
  async verify(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  },

  /**
   * Check if a password is already hashed
   */
  isHashed(password: string | null | undefined): boolean {
    return isAlreadyHashed(password);
  },

  /**
   * Generate a secure random password
   */
  generateSecure(length = 16): string {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  },
};

export default prismaWithPasswordHashing;
