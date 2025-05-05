/*
  Warnings:

  - You are about to drop the column `duration` on the `record` table. All the data in the column will be lost.
  - Added the required column `type` to the `record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `record` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "record_type" AS ENUM ('SPEED', 'HEARTRATE', 'POWER', 'ELEVATION_GAIN', 'ELEVATION_LOSS', 'CADENCE');

-- AlterTable
ALTER TABLE "record" DROP COLUMN "duration",
ADD COLUMN     "type" "record_type" NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;
