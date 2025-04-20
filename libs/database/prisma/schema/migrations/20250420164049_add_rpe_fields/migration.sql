-- AlterTable
ALTER TABLE "event_activity" ADD COLUMN     "rpe" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "event_competition" ADD COLUMN     "goal_rpe" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "event_training" ADD COLUMN     "goal_rpe" DOUBLE PRECISION;
