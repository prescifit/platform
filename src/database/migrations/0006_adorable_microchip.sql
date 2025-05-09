ALTER TABLE "user_profiles" DROP CONSTRAINT "user_profiles_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD PRIMARY KEY ("user_id");--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "emailVerified" timestamp;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD COLUMN "height" numeric;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD COLUMN "weight" numeric;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD COLUMN "age" integer;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "email_verified";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "banned";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "ban_reason";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "ban_expires";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "hashed_password";--> statement-breakpoint
ALTER TABLE "user_profiles" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "user_profiles" DROP COLUMN "role";--> statement-breakpoint
ALTER TABLE "user_profiles" DROP COLUMN "height_cm";--> statement-breakpoint
ALTER TABLE "user_profiles" DROP COLUMN "height_ft";--> statement-breakpoint
ALTER TABLE "user_profiles" DROP COLUMN "initial_weight_kg";--> statement-breakpoint
ALTER TABLE "user_profiles" DROP COLUMN "initial_weight_lb";--> statement-breakpoint
ALTER TABLE "user_profiles" DROP COLUMN "created_at";--> statement-breakpoint
DROP TYPE "public"."role";