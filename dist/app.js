"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const barang_routes_1 = __importDefault(require("./routes/barang.routes"));
const error_handler_1 = require("./middlewares/error.handler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/barang', barang_routes_1.default);
app.use(error_handler_1.errorHandler); // harus paling akhir
exports.default = app;
