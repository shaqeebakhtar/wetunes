/*
  Warnings:

  - You are about to drop the column `thumbnailUrl` on the `tracks` table. All the data in the column will be lost.
  - Added the required column `name` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channel` to the `tracks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hdThumbnailUrl` to the `tracks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sdThumbnailUrl` to the `tracks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `tracks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "rooms_adminId_key";

-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tracks" DROP COLUMN "thumbnailUrl",
ADD COLUMN     "channel" TEXT NOT NULL,
ADD COLUMN     "hdThumbnailUrl" TEXT NOT NULL,
ADD COLUMN     "isPlaying" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sdThumbnailUrl" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
