import { pgTable, integer, numeric, text } from "drizzle-orm/pg-core";
import { users } from "./auth";


export const userProfiles = pgTable("user_profiles", {
  userId: text("user_id").primaryKey().references(() => users.id),
  height: numeric("height"),
  weight: numeric("weight"),
  age: integer("age"),
});
