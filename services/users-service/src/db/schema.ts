import { pgTable, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const userProfiles = pgTable("user_profiles", {
  id: text("id").primaryKey(), // This is the userId from auth DB - NO auto-generation
  bio: text("bio"),
  avatar: text("avatar"),
  preferences: jsonb("preferences").$type<{
    theme: "light" | "dark";
    notifications: boolean;
    language: string;
  }>(),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
