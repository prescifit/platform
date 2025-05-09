import { pgTable, text, timestamp, varchar, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashedPassword").notNull(),
  role: varchar("role", { length: 20 }).$type<"trainee" | "instructor">().notNull(),
  emailVerified: boolean("email_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  image: text("image").default(""),
});
