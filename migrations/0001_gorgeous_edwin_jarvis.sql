CREATE TABLE "magazine_editions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"edition_number" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"summary" text NOT NULL,
	"editorial_note" text,
	"cover_image" text NOT NULL,
	"background_image" text,
	"released_year" integer NOT NULL,
	"released_month" integer NOT NULL,
	"read_online_button_link" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "magazine_editions_edition_number_unique" UNIQUE("edition_number")
);
--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "magazine_edition_id" uuid DEFAULT 'not featured';--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_magazine_edition_id_magazine_editions_id_fk" FOREIGN KEY ("magazine_edition_id") REFERENCES "public"."magazine_editions"("id") ON DELETE set null ON UPDATE no action;