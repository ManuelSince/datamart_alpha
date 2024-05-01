/*
  Warnings:

  - You are about to alter the column `url` on the `Url` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Url" ALTER COLUMN "url" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "img_url" DROP NOT NULL,
ALTER COLUMN "isScrapped" DROP NOT NULL,
ALTER COLUMN "isScrapped" SET DEFAULT 0;
