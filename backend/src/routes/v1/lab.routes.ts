import { Router, Request, Response } from 'express';
import { prisma } from '../../config/database';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

// Get all labs (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, difficulty, categoryId, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = { isActive: true };

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: (tag: string) => tag === search } }
      ];
    }

    const labs = await prisma.labs.findMany({
      where,
      include: {
        lab_categories: {
          select: { id: true, name: true, color: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip
    });

    const total = await pr
