"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const barang_controller_1 = require("../controllers/barang.controller");
const router = express_1.default.Router();
router.get('/', barang_controller_1.getAll);
router.get('/:id', barang_controller_1.getOne);
router.post('/', barang_controller_1.create);
router.put('/:id', barang_controller_1.update);
router.delete('/:id', barang_controller_1.remove);
exports.default = router;
