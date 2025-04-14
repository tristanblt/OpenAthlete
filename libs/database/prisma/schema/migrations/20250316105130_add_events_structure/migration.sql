-- CreateEnum
CREATE TYPE "event_type" AS ENUM ('TRAINING', 'COMPETITION', 'NOTE');

-- CreateTable
CREATE TABLE "event" (
    "event_id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "type" "event_type" NOT NULL,
    "athlete_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "event_training" (
    "event_training_id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "event_training_pkey" PRIMARY KEY ("event_training_id")
);

-- CreateTable
CREATE TABLE "event_competition" (
    "event_competition_id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "event_competition_pkey" PRIMARY KEY ("event_competition_id")
);

-- CreateTable
CREATE TABLE "event_note" (
    "event_note_id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "event_note_pkey" PRIMARY KEY ("event_note_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_athlete_id_key" ON "event"("athlete_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_training_event_id_key" ON "event_training"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_competition_event_id_key" ON "event_competition"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_note_event_id_key" ON "event_note"("event_id");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "athlete"("athlete_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_training" ADD CONSTRAINT "event_training_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_competition" ADD CONSTRAINT "event_competition_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_note" ADD CONSTRAINT "event_note_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;
