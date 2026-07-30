-- CreateTable
CREATE TABLE "SiteTheme" (
    "id" TEXT NOT NULL,
    "tokens" JSONB NOT NULL DEFAULT '{}',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteTheme_pkey" PRIMARY KEY ("id")
);
