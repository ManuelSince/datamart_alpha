-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "img_url" TEXT NOT NULL,
    "isScrapped" INTEGER NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);
