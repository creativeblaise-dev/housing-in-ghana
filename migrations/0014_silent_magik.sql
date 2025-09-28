ALTER TYPE "public"."role" ADD VALUE 'subscriber' BEFORE 'contributor';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 'active'::text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('active', 'inactive', 'suspended');--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 'active'::"public"."status";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";