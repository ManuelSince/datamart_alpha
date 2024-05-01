-- AlterTable
ALTER TABLE "Supplier" ALTER COLUMN "expiredAt" SET DEFAULT NOW() + interval '1 week';
