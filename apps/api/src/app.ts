import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import meRoutes from './routes/me';
import postsRoutes from './routes/posts';
import adminRoutes from './routes/admin';

const app = express();

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/me', meRoutes);
app.use('/posts', postsRoutes);
app.use('/admin', adminRoutes);

export default app;
