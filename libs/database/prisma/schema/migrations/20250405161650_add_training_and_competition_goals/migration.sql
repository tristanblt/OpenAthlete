-- AlterTable
ALTER TABLE "event_competition" ADD COLUMN     "goal_distance" DOUBLE PRECISION,
ADD COLUMN     "goal_duration" INTEGER,
ADD COLUMN     "goal_elevation_gain" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "event_training" ADD COLUMN     "goal_distance" DOUBLE PRECISION,
ADD COLUMN     "goal_duration" INTEGER,
ADD COLUMN     "goal_elevation_gain" DOUBLE PRECISION;
