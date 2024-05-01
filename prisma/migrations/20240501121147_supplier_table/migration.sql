-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255),
    "city" VARCHAR(255),
    "zipcode" INTEGER,
    "rib" VARCHAR(35),
    "rib_name" VARCHAR(255),
    "token" VARCHAR(255),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" TIMESTAMP(3) DEFAULT NOW() + interval '1 week',

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);
