import { pgTable, integer, numeric, text } from "drizzle-orm/pg-core";
import { user } from "./user";

export const userProfile = pgTable("user_profile", {
  userId: text("user_id").primaryKey().references(() => user.id),
  username: text("username"),
  email: text("email"),
  height: numeric("height"),
  weight: numeric("weight"),
  age: integer("age"),
});
