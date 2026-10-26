CREATE TABLE "entries" (
	"id" serial PRIMARY KEY,
	"user_id" text NOT NULL,
	"date" date NOT NULL,
	"category" text NOT NULL,
	"payment" text NOT NULL,
	"amount" numeric(12,2) NOT NULL,
	"priority" text NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "entries_user_id_idx" ON "entries" ("user_id");