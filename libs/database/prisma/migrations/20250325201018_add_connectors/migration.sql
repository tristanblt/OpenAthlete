-- CreateEnum
CREATE TYPE "connector_provider" AS ENUM ('STRAVA', 'GARMIN', 'FITBIT', 'APPLE_HEALTH');

-- CreateTable
CREATE TABLE "connector" (
    "connector_id" SERIAL NOT NULL,
    "provider" "connector_provider" NOT NULL,
    "token" TEXT NOT NULL,
    "athlete_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "connector_pkey" PRIMARY KEY ("connector_id")
);

-- AddForeignKey
ALTER TABLE "connector" ADD CONSTRAINT "connector_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "athlete"("athlete_id") ON DELETE RESTRICT ON UPDATE CASCADE;
