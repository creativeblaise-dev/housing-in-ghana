CREATE TABLE "leads_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"mesage" text NOT NULL,
	CONSTRAINT "leads_table_id_unique" UNIQUE("id"),
	CONSTRAINT "leads_table_email_unique" UNIQUE("email")
);
