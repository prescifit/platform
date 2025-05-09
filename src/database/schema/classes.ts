import { pgTable, uuid, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const classes = pgTable("classes", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  instructorId: uuid("instructor_id")
    .notNull()
    .references(() => users.id), // References the user table
  videoUrl: text("video_url").notNull(),
  duration: numeric("duration_minutes").notNull(), // Class length in minutes
  difficulty: text("difficulty").$type<"beginner" | "intermediate" | "advanced">(),
  price: numeric("price").notNull().default("0.00"),
  createdAt: timestamp("created_at").defaultNow(),
  thumbnail: text("thumbnail_url"), // URL for class thumbnail image
  category: text("category").$type<"strength" | "cardio">(),
});