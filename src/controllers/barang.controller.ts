import { Request, Response } from 'express';
import * as BarangService from '../services/barang.service';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const { kategori, minStok } = req.query;
  const result = await BarangService.getAllBarang(
    kategori?.toString(),
    minStok ? Number(minStok) : undefined
  );
  res.json(result);
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const barang = await BarangService.getBarangById(id);
  if (!barang) {
    res.status(404).json({ error: "Barang tidak ditemukan" });
    return;
  }
  res.json(barang);
};

export const create = async (req: Request, res: Response) => {
  try {
    const newBarang = await BarangService.createBarang(req.body); // parsing langsung di service
    res.status(201).json(newBarang);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const updated = await BarangService.updateBarang(id, req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deleted = await BarangService.deleteBarang(id);
    res.json(deleted);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
