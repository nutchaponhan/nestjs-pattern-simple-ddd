ALTER TABLE "users" DROP CONSTRAINT "users_city_id_cities_id_fk";
--> statement-breakpoint
DROP TABLE "cities";--> statement-breakpoint
DROP TABLE "countries";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "name" TO "email";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_name" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "city_id";