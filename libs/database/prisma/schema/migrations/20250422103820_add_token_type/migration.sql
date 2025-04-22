/*
  Warnings:

  - Added the required column `type` to the `token` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "token_type" AS ENUM ('PASSWORD_RESET');

-- AlterTable
ALTER TABLE "token" ADD COLUMN     "type" "token_type" NOT NULL;
