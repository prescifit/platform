import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./user";

export const submission = pgTable("submission", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  traineeId: text("trainee_id")
    .notNull()
    .references(() => user.id),

  instructorId: text("instructor_id")           
    .references(() => user.id),

  videoUrl: text("video_url").notNull(),
  feedback: text("feedback"),
  status: text("status")
    .$type<"pending" | "reviewed">()
    .default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});
