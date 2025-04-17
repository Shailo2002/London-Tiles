/*
  Warnings:

  - Added the required column `priceExVAT` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceIncVAT` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "priceExVAT" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceIncVAT" DOUBLE PRECISION NOT NULL;
