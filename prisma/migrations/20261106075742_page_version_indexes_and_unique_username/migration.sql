/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "lastLoginAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_username_key" ON "Account"("username");

-- CreateIndex
CREATE INDEX "Link_pageVersionThatReference_idx" ON "Link"("pageVersionThatReference");

-- CreateIndex
CREATE INDEX "Post_pageVersionThatReference_idx" ON "Post"("pageVersionThatReference");

-- CreateIndex
CREATE INDEX "Project_pageVersionThatReference_idx" ON "Project"("pageVersionThatReference");

-- CreateIndex
CREATE INDEX "Reading_pageVersionThatReference_idx" ON "Reading"("pageVersionThatReference");
