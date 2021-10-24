-- CreateTable
CREATE TABLE "PostsPage" (
    "version" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "PostsPage_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "originalPublishDate" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "snippet" TEXT NOT NULL,
    "pageVersionThatReference" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_pageVersionThatReference_fkey" FOREIGN KEY ("pageVersionThatReference") REFERENCES "PostsPage"("version") ON DELETE RESTRICT ON UPDATE CASCADE;
