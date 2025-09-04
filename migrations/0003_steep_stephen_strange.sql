CREATE TABLE "article_magazine_edition" (
	"article_id" uuid NOT NULL,
	"magazine_edition_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "magazine_editions" ALTER COLUMN "released_year" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "magazine_editions" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "magazine_editions" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "magazine_editions" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "magazine_editions" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "article_magazine_edition" ADD CONSTRAINT "article_magazine_edition_article_id_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_magazine_edition" ADD CONSTRAINT "article_magazine_edition_magazine_edition_id_magazine_editions_id_fk" FOREIGN KEY ("magazine_edition_id") REFERENCES "public"."magazine_editions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "magazine_editions" DROP COLUMN "released_month";