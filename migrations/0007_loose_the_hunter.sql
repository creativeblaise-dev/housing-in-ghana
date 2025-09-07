ALTER TABLE "article" RENAME COLUMN "magazine_edition_id" TO "magazine_edition_number";--> statement-breakpoint
ALTER TABLE "article" DROP CONSTRAINT "article_magazine_edition_id_magazine_editions_id_fk";
--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_magazine_edition_number_magazine_editions_edition_number_fk" FOREIGN KEY ("magazine_edition_number") REFERENCES "public"."magazine_editions"("edition_number") ON DELETE set null ON UPDATE no action;