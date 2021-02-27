DROP DATABASE IF EXISTS db_foodfy
CREATE DATABASE db_foodfy

-- TABLES

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "reset_token" TEXT,
  "reset_token_expires" TEXT,
  "is_admin" BOOLEAN DEFAULT false,
  "created_at" TIMESTAMP DEFAULT now(),
  "updated_at" TIMESTAMP DEFAULT now()
);

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int NOT NULL,
  "chef_id" int NOT NULL,
  "title" text NOT NULL,
  "ingredients" text[] NOT NULL,
  "preparation" text[] NOT NULL,
  "description" text,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

CREATE TABLE "files_manager" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" int,
  "recipe_id" int
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "path" text[] NOT NULL,
  "files_manager_id" int UNIQUE
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" 
ADD CONSTRAINT "session_pkey" 
PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- CONSTRAINTS

ALTER TABLE "recipes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");

ALTER TABLE "files_manager" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");

ALTER TABLE "files_manager" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("files_manager_id") REFERENCES "files_manager" ("id");

-- PROCEDURE

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER

-- RECIPES
CREATE TRIGGER trigger_set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- CASCADE EFFECT ON DELETE

ALTER TABLE "recipes"
DROP CONSTRAINT recipes_user_id_fkey,
ADD CONSTRAINT recipes_user_id_fkey
FOREIGN KEY ("user_id")
REFERENCES "users" ("id")
ON DELETE CASCADE;

ALTER TABLE "recipes"
DROP CONSTRAINT recipes_chef_id_fkey,
ADD CONSTRAINT recipes_chef_id_fkey
FOREIGN KEY ("chef_id")
REFERENCES "chefs" ("id")
ON DELETE CASCADE;

ALTER TABLE "files_manager"
DROP CONSTRAINT files_manager_chef_id_fkey,
ADD CONSTRAINT files_manager_chef_id_fkey
FOREIGN KEY ("chef_id")
REFERENCES "chefs" ("id")
ON DELETE CASCADE;

ALTER TABLE "files_manager"
DROP CONSTRAINT files_manager_recipe_id_fkey,
ADD CONSTRAINT files_manager_recipe_id_fkey
FOREIGN KEY ("recipe_id")
REFERENCES "recipes" ("id")
ON DELETE CASCADE;

ALTER TABLE "files"
DROP CONSTRAINT files_files_manager_id_fkey,
ADD CONSTRAINT files_files_manager_id_fkey
FOREIGN KEY ("files_manager_id")
REFERENCES "files_manager" ("id")
ON DELETE CASCADE;

-- RESET SEQUENCE

ALTER SEQUENCE chefs_id_seq RESTART WITH 1;