-- AlterEnum
ALTER TYPE "event_type" ADD VALUE 'ACTIVITY';

-- CreateTable
CREATE TABLE "event_activity" (
    "event_activity_id" SERIAL NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "elevation_gain" DOUBLE PRECISION NOT NULL,
    "external_id" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "event_activity_pkey" PRIMARY KEY ("event_activity_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_activity_event_id_key" ON "event_activity"("event_id");

-- AddForeignKey
ALTER TABLE "event_activity" ADD CONSTRAINT "event_activity_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;
