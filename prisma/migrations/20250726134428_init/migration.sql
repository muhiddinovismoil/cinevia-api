-- CreateEnum
CREATE TYPE "role_types" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "email" VARCHAR(255) NOT NULL,
    "fullname" VARCHAR(60) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role_types" "role_types" NOT NULL DEFAULT 'USER',
    "photo" TEXT,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
