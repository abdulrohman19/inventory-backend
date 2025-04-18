import express from 'express';
import barangRoutes from './routes/barang.routes';
import cors from 'cors';
import { errorHandler } from './middlewares/error.handler';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));


app.use('/api/barang', barangRoutes);
app.use(errorHandler);

export default app;
