import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/roles';

const router = Router();

function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Public: list published posts with pagination and optional search
router.get('/', async (req: Request, res: Response) => {
  const page = Math.max(parseInt(String(req.query.page ?? '1')), 1);
  const pageSize = Math.min(Math.max(parseInt(String(req.query.pageSize ?? '10')), 1), 50);
  const search = String(req.query.search ?? '').trim();

  const where: any = { status: 'published' };
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { excerpt: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
        author: { select: { id: true, name: true, email: true } },
      },
    }),
    prisma.post.count({ where }),
  ]);

  return res.json({ items, page, pageSize, total });
});

// Public: get post by slug (only published)
router.get('/:slug', async (req: Request, res: Response) => {
  const { slug } = req.params;
  const post = await prisma.post.findFirst({
    where: { slug, status: 'published' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      coverImage: true,
      publishedAt: true,
      author: { select: { id: true, name: true, email: true } },
    },
  });
  if (!post) return res.status(404).json({ error: 'not found' });
  return res.json(post);
});

// Create post (EDITOR/ADMIN)
router.post('/', requireAuth, requireRole('EDITOR', 'ADMIN'), async (req: Request, res: Response) => {
  const userId = (req as any).userId as string;
  const { title, content, excerpt, coverImage, status } = req.body ?? {};
  if (!title || !content) return res.status(400).json({ error: 'title and content are required' });

  let slug = slugify(title);
  // ensure unique
  let candidate = slug;
  let counter = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const exists = await prisma.post.findUnique({ where: { slug: candidate } });
    if (!exists) { slug = candidate; break; }
    counter += 1;
    candidate = `${slug}-${counter}`;
  }

  const now = new Date();
  const publishedAt = status === 'published' ? now : null;

  const post = await prisma.post.create({
    data: { title, content, excerpt, coverImage, slug, status: status ?? 'draft', publishedAt, authorId: userId },
    select: { id: true, title: true, slug: true, status: true },
  });
  return res.status(201).json(post);
});

// Update post (EDITOR/ADMIN) — author can edit own, ADMIN can edit any
router.patch('/:id', requireAuth, requireRole('EDITOR', 'ADMIN'), async (req: Request, res: Response) => {
  const userId = (req as any).userId as string;
  const { id } = req.params;
  const { title, content, excerpt, coverImage, status } = req.body ?? {};

  const post = await prisma.post.findUnique({ where: { id }, select: { id: true, authorId: true } });
  if (!post) return res.status(404).json({ error: 'not found' });

  const me = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
  const isOwner = post.authorId === userId;
  const isAdmin = me?.role === 'ADMIN';
  if (!isOwner && !isAdmin) return res.status(403).json({ error: 'forbidden' });

  const data: any = {};
  if (title) data.title = title;
  if (content) data.content = content;
  if (excerpt) data.excerpt = excerpt;
  if (coverImage) data.coverImage = coverImage;
  if (status) {
    data.status = status;
    data.publishedAt = status === 'published' ? new Date() : null;
  }
  if (title) {
    const newSlug = slugify(title);
    if (newSlug && newSlug !== (await prisma.post.findUnique({ where: { id }, select: { slug: true } }))?.slug) {
      let candidate = newSlug;
      let counter = 1;
      while (await prisma.post.findUnique({ where: { slug: candidate } })) {
        counter += 1;
        candidate = `${newSlug}-${counter}`;
      }
      data.slug = candidate;
    }
  }

  const updated = await prisma.post.update({ where: { id }, data, select: { id: true, title: true, slug: true, status: true } });
  return res.json(updated);
});

// Delete post (EDITOR/ADMIN) — author or admin
router.delete('/:id', requireAuth, requireRole('EDITOR', 'ADMIN'), async (req: Request, res: Response) => {
  const userId = (req as any).userId as string;
  const { id } = req.params;
  const post = await prisma.post.findUnique({ where: { id }, select: { id: true, authorId: true } });
  if (!post) return res.status(404).json({ error: 'not found' });

  const me = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
  const isOwner = post.authorId === userId;
  const isAdmin = me?.role === 'ADMIN';
  if (!isOwner && !isAdmin) return res.status(403).json({ error: 'forbidden' });

  await prisma.post.delete({ where: { id } });
  return res.status(204).send();
});

export default router;
