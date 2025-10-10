import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/roles';

const router = Router();

// List all users (ADMIN)
router.get('/users', requireAuth, requireRole('ADMIN'), async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  res.json({ items: users });
});

// List all posts (ADMIN)
router.get('/posts', requireAuth, requireRole('ADMIN'), async (_req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      publishedAt: true,
      author: { select: { id: true, email: true, name: true } },
      createdAt: true,
    },
  });
  res.json({ items: posts });
});

// Stats: number of posts by user (ADMIN)
router.get('/stats', requireAuth, requireRole('ADMIN'), async (_req: Request, res: Response) => {
  const byUser = await prisma.post.groupBy({
    by: ['authorId'],
    _count: { _all: true },
  });
  const users = await prisma.user.findMany({ select: { id: true, email: true, name: true } });
  const map = new Map(users.map((u) => [u.id, u]));
  const items = byUser.map((row) => ({
    user: map.get(row.authorId),
    postCount: row._count._all,
  }));
  res.json({ items });
});

export default router;
