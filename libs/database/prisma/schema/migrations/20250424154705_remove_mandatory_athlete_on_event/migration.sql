-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_athlete_id_fkey";

-- AlterTable
ALTER TABLE "event" ALTER COLUMN "athlete_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "athlete"("athlete_id") ON DELETE SET NULL ON UPDATE CASCADE;
