/*
  Warnings:

  - A unique constraint covering the columns `[related_activity_id]` on the table `event_competition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[related_activity_id]` on the table `event_training` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sport` to the `event_competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sport` to the `event_training` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "training_zone_type" AS ENUM ('HEARTRATE', 'POWER', 'PACE');

-- AlterTable
ALTER TABLE "event_competition" ADD COLUMN     "related_activity_id" INTEGER,
ADD COLUMN     "sport" "sport_type" NOT NULL;

-- AlterTable
ALTER TABLE "event_training" ADD COLUMN     "related_activity_id" INTEGER,
ADD COLUMN     "sport" "sport_type" NOT NULL;

-- CreateTable
CREATE TABLE "training_zone" (
    "training_zone_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "type" "training_zone_type" NOT NULL,
    "color" TEXT NOT NULL,
    "athlete_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "training_zone_pkey" PRIMARY KEY ("training_zone_id")
);

-- CreateTable
CREATE TABLE "training_zone_value" (
    "training_zone_value_id" SERIAL NOT NULL,
    "min" DOUBLE PRECISION NOT NULL,
    "max" DOUBLE PRECISION NOT NULL,
    "sports" "sport_type"[],
    "training_zone_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "training_zone_value_pkey" PRIMARY KEY ("training_zone_value_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_competition_related_activity_id_key" ON "event_competition"("related_activity_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_training_related_activity_id_key" ON "event_training"("related_activity_id");

-- AddForeignKey
ALTER TABLE "training_zone" ADD CONSTRAINT "training_zone_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "athlete"("athlete_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_zone_value" ADD CONSTRAINT "training_zone_value_training_zone_id_fkey" FOREIGN KEY ("training_zone_id") REFERENCES "training_zone"("training_zone_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_training" ADD CONSTRAINT "event_training_related_activity_id_fkey" FOREIGN KEY ("related_activity_id") REFERENCES "event_activity"("event_activity_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_competition" ADD CONSTRAINT "event_competition_related_activity_id_fkey" FOREIGN KEY ("related_activity_id") REFERENCES "event_activity"("event_activity_id") ON DELETE SET NULL ON UPDATE CASCADE;
