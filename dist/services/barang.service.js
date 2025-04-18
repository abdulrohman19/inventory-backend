"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBarang = exports.updateBarang = exports.createBarang = exports.getBarangById = exports.getAllBarang = exports.barangSchema = void 0;
const db_1 = __importDefault(require("../utils/db"));
const zod_1 = require("zod");
// Zod schema validasi untuk create barang
exports.barangSchema = zod_1.z
    .object({
    nama: zod_1.z.string().min(1),
    kategori: zod_1.z.string().min(1),
    stok: zod_1.z.number().int().nonnegative(),
    hargaBeli: zod_1.z.number().int().nonnegative(),
    hargaJual: zod_1.z.number().int()
})
    .strict()
    .superRefine((data, ctx) => {
    if (data.hargaJual <= data.hargaBeli) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Harga jual harus lebih tinggi dari harga beli",
            path: ["hargaJual"],
        });
    }
});
// ✅ READ: Get semua barang, bisa difilter
const getAllBarang = async (kategori, minStok) => {
    return db_1.default.barang.findMany({
        where: {
            ...(kategori && { kategori }),
            ...(minStok !== undefined && { stok: { gte: minStok } }),
        },
        orderBy: { updatedAt: 'desc' },
    });
};
exports.getAllBarang = getAllBarang;
// ✅ READ: Get barang by ID
const getBarangById = async (id) => {
    return db_1.default.barang.findUnique({ where: { id } });
};
exports.getBarangById = getBarangById;
// ✅ CREATE: Validasi input lalu simpan
const createBarang = async (data) => {
    const parsed = exports.barangSchema.parse(data); // Validasi input
    return db_1.default.barang.create({
        data: parsed // Casting supaya Prisma terima
    });
};
exports.createBarang = createBarang;
// ✅ UPDATE: Validasi parsial
const updateBarang = async (id, data) => {
    if (data.hargaJual && data.hargaBeli && data.hargaJual <= data.hargaBeli) {
        throw new Error("Harga jual harus lebih tinggi dari harga beli");
    }
    if (data.stok !== undefined && data.stok < 0) {
        throw new Error("Stok tidak boleh negatif");
    }
    return db_1.default.barang.update({ where: { id }, data });
};
exports.updateBarang = updateBarang;
// ✅ DELETE: Cek dulu stok, baru delete
const deleteBarang = async (id) => {
    const barang = await db_1.default.barang.findUnique({ where: { id } });
    if (!barang)
        throw new Error("Barang tidak ditemukan");
    if (barang.stok > 0)
        throw new Error("Tidak bisa menghapus barang yang masih punya stok");
    return db_1.default.barang.delete({ where: { id } });
};
exports.deleteBarang = deleteBarang;
