import express from 'express';
import barangRoutes from './routes/barang.routes';
import { errorHandler } from './middlewares/error.handler';

const app = express();
app.use(express.json());

app.use('/api/barang', barangRoutes);
app.use(errorHandler); // harus paling akhir

export default app;
