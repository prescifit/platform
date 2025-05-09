import { pgTable, timestamp, numeric, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { classes } from "./classes";

export const purchases = pgTable("purchases", {
  id: uuid("id").primaryKey().defaultRandom(),
  traineeId: uuid("trainee_id").notNull().references(() => users.id),
  classId: uuid("class_id").notNull().references(() => classes.id),
  progress: numeric("progress").default("0"),
  purchasedAt: timestamp("purchased_at").defaultNow(),
});