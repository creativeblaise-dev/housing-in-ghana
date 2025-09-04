ALTER TABLE "magazine_editions" ALTER COLUMN "editorial_note" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "magazine_editions" ALTER COLUMN "background_image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "magazine_editions" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "magazine_editions" DROP COLUMN "updated_at";