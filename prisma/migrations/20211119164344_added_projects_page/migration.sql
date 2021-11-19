-- CreateTable
CREATE TABLE "ProjectsPage" (
    "version" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "ProjectsPage_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "appUrl" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "pageVersionThatReference" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_pageVersionThatReference_fkey" FOREIGN KEY ("pageVersionThatReference") REFERENCES "ProjectsPage"("version") ON DELETE RESTRICT ON UPDATE CASCADE;
