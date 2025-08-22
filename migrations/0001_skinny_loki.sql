CREATE TYPE "public"."role" AS ENUM('client', 'admin', 'super_admin');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('approved', 'pending', 'rejected');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"role" "role" DEFAULT 'client' NOT NULL,
	"last_activity" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "leads_table" ADD COLUMN "message" text NOT NULL;--> statement-breakpoint
ALTER TABLE "leads_table" DROP COLUMN "mesage";