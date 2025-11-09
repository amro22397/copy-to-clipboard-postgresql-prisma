-- AlterTable
ALTER TABLE "Text" ADD COLUMN     "listId" TEXT,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "TextArea" ADD COLUMN     "listId" TEXT,
ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "List" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "emailRef" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);
