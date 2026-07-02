import 'dotenv/config';
import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import { contactRouter } from './routes/contact.js';

const PORT = Number(process.env.PORT) || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tecla';
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/contact', contactRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
};
app.use(errorHandler);

connectDB(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`TecLa API listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
