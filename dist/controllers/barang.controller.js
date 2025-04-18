"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getOne = exports.getAll = void 0;
const BarangService = __importStar(require("../services/barang.service"));
const getAll = async (req, res) => {
    const { kategori, minStok } = req.query;
    const result = await BarangService.getAllBarang(kategori?.toString(), minStok ? Number(minStok) : undefined);
    res.json(result);
};
exports.getAll = getAll;
const getOne = async (req, res) => {
    const id = Number(req.params.id);
    const barang = await BarangService.getBarangById(id);
    if (!barang) {
        res.status(404).json({ error: "Barang tidak ditemukan" });
        return;
    }
    res.json(barang);
};
exports.getOne = getOne;
const create = async (req, res) => {
    try {
        const newBarang = await BarangService.createBarang(req.body); // parsing langsung di service
        res.status(201).json(newBarang);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.create = create;
const update = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const updated = await BarangService.updateBarang(id, req.body);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const deleted = await BarangService.deleteBarang(id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.remove = remove;
