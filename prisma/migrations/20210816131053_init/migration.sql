-- CreateTable
CREATE TABLE "AboutPage" (
    "version" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pictureURL" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AboutPageToLink" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AboutPageToLink_AB_unique" ON "_AboutPageToLink"("A", "B");

-- CreateIndex
CREATE INDEX "_AboutPageToLink_B_index" ON "_AboutPageToLink"("B");

-- AddForeignKey
ALTER TABLE "_AboutPageToLink" ADD FOREIGN KEY ("A") REFERENCES "AboutPage"("version") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AboutPageToLink" ADD FOREIGN KEY ("B") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
