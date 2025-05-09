import { pgTable, uuid, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const classTable = pgTable("class", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  instructorId: text("instructor_id")
    .references(() => user.id), // References the user table
  videoUrl: text("video_url").notNull(),
  duration: numeric("duration_minutes").notNull(), // Class length in minutes
  difficulty: text("difficulty").$type<"beginner" | "intermediate" | "advanced">(),
  price: numeric("price").notNull().default("0.00"),
  createdAt: timestamp("created_at").defaultNow(),
  thumbnail: text("thumbnail_url"), // URL for class thumbnail image
  category: text("category").$type<"strength" | "cardio">(),
});