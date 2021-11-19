-- CreateTable
CREATE TABLE "ReadingsPage" (
    "version" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "ReadingsPage_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "Reading" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "foundDate" TIMESTAMP(3) NOT NULL,
    "publishDate" TIMESTAMP(3) NOT NULL,
    "quote" TEXT NOT NULL,
    "publication" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "pageVersionThatReference" INTEGER NOT NULL,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_pageVersionThatReference_fkey" FOREIGN KEY ("pageVersionThatReference") REFERENCES "ReadingsPage"("version") ON DELETE RESTRICT ON UPDATE CASCADE;
