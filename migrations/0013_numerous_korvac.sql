ALTER TABLE "article" ALTER COLUMN "content" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "article" ALTER COLUMN "content" SET DEFAULT '[]';