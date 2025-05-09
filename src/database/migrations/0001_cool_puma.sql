ALTER TABLE "user_profiles" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "role" SET DEFAULT 'trainee'::text;--> statement-breakpoint
DROP TYPE "public"."role";--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('instructor', 'trainee');--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "role" SET DEFAULT 'trainee'::"public"."role";--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "role" SET DATA TYPE "public"."role" USING "role"::"public"."role";