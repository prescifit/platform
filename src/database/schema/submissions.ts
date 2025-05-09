import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const submissions = pgTable("submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  traineeId: uuid("trainee_id").notNull().references(() => users.id),
  videoUrl: text("video_url").notNull(),
  feedback: text("feedback"),
  instructorId: uuid("instructor_id").references(() => users.id),
  status: text("status").$type<"pending" | "reviewed">().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});
