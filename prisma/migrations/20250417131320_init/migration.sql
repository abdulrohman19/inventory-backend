-- CreateTable
CREATE TABLE "Barang" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "hargaBeli" INTEGER NOT NULL,
    "hargaJual" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Barang_pkey" PRIMARY KEY ("id")
);
