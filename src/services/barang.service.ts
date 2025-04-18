import { Prisma } from '@prisma/client';
import prisma from '../utils/db'; 
import { z } from 'zod';

// Zod schema validasi untuk create barang
export const barangSchema = z
  .object({
    nama: z.string().min(1),
    kategori: z.string().min(1),
    stok: z.number().int().nonnegative(),
    hargaBeli: z.number().int().nonnegative(),
    hargaJual: z.number().int()
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.hargaJual <= data.hargaBeli) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Harga jual harus lebih tinggi dari harga beli",
        path: ["hargaJual"],
      });
    }
  });

type BarangInput = z.infer<typeof barangSchema>;

// ✅ READ: Get semua barang, bisa difilter
export const getAllBarang = async (kategori?: string, minStok?: number) => {
  return prisma.barang.findMany({
    where: {
      ...(kategori && { kategori }),
      ...(minStok !== undefined && { stok: { gte: minStok } }),
    },
    orderBy: { updatedAt: 'desc' },
  });
};

// ✅ READ: Get barang by ID
export const getBarangById = async (id: number) => {
  return prisma.barang.findUnique({ where: { id } });
};

// ✅ CREATE: Validasi input lalu simpan
export const createBarang = async (data: unknown) => {
  const parsed = barangSchema.parse(data); // Validasi input

  return prisma.barang.create({
    data: parsed as Prisma.BarangCreateInput // Casting supaya Prisma terima
  });
};

// ✅ UPDATE: Validasi parsial
export const updateBarang = async (id: number, data: Partial<BarangInput>) => {
  if (data.hargaJual && data.hargaBeli && data.hargaJual <= data.hargaBeli) {
    throw new Error("Harga jual harus lebih tinggi dari harga beli");
  }

  if (data.stok !== undefined && data.stok < 0) {
    throw new Error("Stok tidak boleh negatif");
  }

  return prisma.barang.update({ where: { id }, data });
};

// ✅ DELETE: Cek dulu stok, baru delete
export const deleteBarang = async (id: number) => {
  const barang = await prisma.barang.findUnique({ where: { id } });
  if (!barang) throw new Error("Barang tidak ditemukan");
  if (barang.stok > 0) throw new Error("Tidak bisa menghapus barang yang masih punya stok");

  return prisma.barang.delete({ where: { id } });
};
