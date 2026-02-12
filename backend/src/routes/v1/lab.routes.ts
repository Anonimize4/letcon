import { Router, Request, Response } from 'express';
import { prisma } from '../../config/database';

const router = Router();

// Updated Interface to match your Auth requirements
interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
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

    if (search && typeof search === 'string') {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // FIXED: Using 'lab' (singular) and 'category' (relation name)
    const labs = await prisma.lab.findMany({
      where,
      include: {
        category: { 
          select: { id: true, name: true, color: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip
    });

    const total = await prisma.lab.count({ where });

    res.json({
      labs,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching labs:', error);
    res.status(500).json({ message: 'Error fetching labs' });
  }
});

export default router;
