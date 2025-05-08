-- CreateEnum
CREATE TYPE "equipment_type" AS ENUM ('SHOE', 'BIKE');

-- AlterTable
ALTER TABLE "event_activity" ADD COLUMN     "equipment_id" INTEGER;

-- CreateTable
CREATE TABLE "equipment" (
    "equipment_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "equipment_type" NOT NULL,
    "total_distance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "sports" "sport_type"[],
    "athlete_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("equipment_id")
);

-- AddForeignKey
ALTER TABLE "equipment" ADD CONSTRAINT "equipment_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "athlete"("athlete_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_activity" ADD CONSTRAINT "event_activity_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipment"("equipment_id") ON DELETE SET NULL ON UPDATE CASCADE;
