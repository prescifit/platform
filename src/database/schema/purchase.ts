import { pgTable, timestamp, numeric, text } from "drizzle-orm/pg-core";
import { user } from "./user";
import { classTable } from "./class";

export const purchase = pgTable("purchase", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  traineeId: text("trainee_id")
      .notNull()
      .references(() => user.id),
  classId: text("class_id").references(() => classTable.id),
  progress: numeric("progress").default("0"),
  purchasedAt: timestamp("purchased_at").defaultNow(),
});
