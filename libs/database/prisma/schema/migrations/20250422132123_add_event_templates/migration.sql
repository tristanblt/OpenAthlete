-- CreateTable
CREATE TABLE "event_template" (
    "event_template_id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_template_pkey" PRIMARY KEY ("event_template_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_template_event_id_key" ON "event_template"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_template_user_id_key" ON "event_template"("user_id");

-- AddForeignKey
ALTER TABLE "event_template" ADD CONSTRAINT "event_template_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_template" ADD CONSTRAINT "event_template_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
