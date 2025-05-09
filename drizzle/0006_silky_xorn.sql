ALTER TABLE "purchases" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "purchases" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "purchases" ALTER COLUMN "trainee_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "purchases" ALTER COLUMN "class_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "purchases" ALTER COLUMN "class_id" DROP NOT NULL;