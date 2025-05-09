ALTER TABLE "class" ALTER COLUMN "video_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_profile" ADD COLUMN "username" text;--> statement-breakpoint
ALTER TABLE "user_profile" ADD COLUMN "email" text;