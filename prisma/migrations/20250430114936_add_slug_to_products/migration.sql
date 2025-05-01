/*
  Warnings:

  - You are about to drop the column `Finish` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `Height` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `Length` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `Rebate` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `Thickness` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `priceExVAT` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `priceIncVAT` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `productCategory` on the `Products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Products_name_key";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "Finish",
DROP COLUMN "Height",
DROP COLUMN "Length",
DROP COLUMN "Rebate",
DROP COLUMN "Thickness",
DROP COLUMN "image",
DROP COLUMN "priceExVAT",
DROP COLUMN "priceIncVAT",
DROP COLUMN "productCategory",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "thickness" TEXT NOT NULL,
    "priceIncVAT" DOUBLE PRECISION NOT NULL,
    "priceExVAT" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_productId_height_length_thickness_key" ON "ProductVariant"("productId", "height", "length", "thickness");

-- CreateIndex
CREATE UNIQUE INDEX "Products_slug_key" ON "Products"("slug");

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
