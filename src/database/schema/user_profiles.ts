import { pgTable, uuid, varchar, numeric, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const roleEnum = pgEnum("role", ["instructor",  "user"]);

export const userProfiles = pgTable("user_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),

  role: roleEnum("role").default("user").notNull(),

  heightCm: numeric("height_cm"),
  heightFt: numeric("height_ft"),
  initialWeightKg: numeric("initial_weight_kg"),
  initialWeightLb: numeric("initial_weight_lb"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});


// helpers

export const heightUtils = {
  cmToFeet: (cm: number): { feet: number, inches: number } => {
    if (!cm) return { feet: 0, inches: 0 };
    
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12 * 10) / 10;
    
    return { feet, inches };
  },
  
  feetToCm: (feet: number, inches: number): number => {
    return Math.round((feet * 12 + inches) * 2.54 * 10) / 10;
  }
};

export const weightUtils = {
  kgToLbs: (kg: number): number => {
    if (!kg) return 0;
    return Math.round(kg * 2.20462 * 10) / 10;
  },
  
  lbsToKg: (lbs: number): number => {
    return Math.round(lbs / 2.20462 * 10) / 10;
  }
};

export const getUserHeight = (heightCm: number | null) => {
  if (!heightCm) return { cm: null, feet: null };
  
  const { feet, inches } = heightUtils.cmToFeet(Number(heightCm));
  
  return {
    cm: Number(heightCm),
    feet: { feet, inches }
  };
};

export const getUserWeight = (weightKg: number | null) => {
  if (!weightKg) return { kg: null, lbs: null };
  
  return {
    kg: Number(weightKg),
    lbs: weightUtils.kgToLbs(Number(weightKg))
  };
};

