-- AlterTable
ALTER TABLE "event_competition" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "event_note" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "event_training" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';
