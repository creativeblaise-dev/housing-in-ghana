ALTER TABLE "article_magazine_edition" DROP CONSTRAINT "article_magazine_edition_magazine_edition_id_magazine_editions_id_fk";
--> statement-breakpoint
ALTER TABLE "article_magazine_edition" ADD COLUMN "magazine_edition_alias" varchar(25) NOT NULL;--> statement-breakpoint
ALTER TABLE "article_magazine_edition" ADD CONSTRAINT "article_magazine_edition_magazine_edition_alias_magazine_editions_edition_alias_fk" FOREIGN KEY ("magazine_edition_alias") REFERENCES "public"."magazine_editions"("edition_alias") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_magazine_edition" DROP COLUMN "magazine_edition_id";