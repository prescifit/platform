ALTER TABLE "classes" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "classes" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "classes" ALTER COLUMN "instructor_id" SET DATA TYPE text;