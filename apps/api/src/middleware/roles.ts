import { NextFunction, Response } from 'express';
import { prisma } from '../prisma';
import { AuthRequest } from './auth';

export function requireRole(...roles: Array<'ADMIN' | 'EDITOR' | 'USER'>) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: 'unauthorized' });

    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, role: true } });
    if (!user) return res.status(401).json({ error: 'unauthorized' });

    if (!roles.includes(user.role as any)) {
      return res.status(403).json({ error: 'forbidden' });
    }
    (req as any).userRole = user.role;
    next();
  };
}
