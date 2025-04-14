/*
  Warnings:

  - Added the required column `average_speed` to the `event_activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_speed` to the `event_activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moving_time` to the `event_activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sport` to the `event_activity` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "sport_type" AS ENUM ('RUNNING', 'CYCLING', 'SWIMMING', 'OTHER');

-- AlterTable
ALTER TABLE "event_activity" ADD COLUMN     "average_cadence" DOUBLE PRECISION,
ADD COLUMN     "average_heartrate" DOUBLE PRECISION,
ADD COLUMN     "average_speed" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "average_watts" DOUBLE PRECISION,
ADD COLUMN     "kilojoules" DOUBLE PRECISION,
ADD COLUMN     "max_heartrate" DOUBLE PRECISION,
ADD COLUMN     "max_speed" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "max_watts" DOUBLE PRECISION,
ADD COLUMN     "moving_time" INTEGER NOT NULL,
ADD COLUMN     "provider" "connector_provider",
ADD COLUMN     "sport" "sport_type" NOT NULL,
ADD COLUMN     "stream" JSONB,
ADD COLUMN     "weighted_average_watts" DOUBLE PRECISION;
