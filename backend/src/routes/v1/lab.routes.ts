import { Router } from 'express';
import { prisma } from '../../config/database';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

// Get all labs (public)
router.get('/', async (req, res) => {
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

    const total = await prisma.labs.count({ where });

    res.json({
      success: true,
      data: {
        labs,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    console.error('Get labs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get lab by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const lab = await prisma.labs.findUnique({
      where: { id, isActive: true },
      include: {
        lab_categories: {
          select: { id: true, name: true, description: true, color: true }
        }
      }
    });

    if (!lab) {
      return res.status(404).json({
        success: false,
        message: 'Lab not found'
      });
    }

    res.json({
      success: true,
      data: { lab }
    });
  } catch (error) {
    console.error('Get lab error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Enroll in lab (authenticated)
router.post('/:id/enroll', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;

    const lab = await prisma.labs.findUnique({
      where: { id, isActive: true }
    });

    if (!lab) {
      return res.status(404).json({
        success: false,
        message: 'Lab not found'
      });
    }

    const existingEnrollment = await prisma.enrollments.findFirst({
      where: { userId, labId: id }
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this lab'
      });
    }

    const enrollment = await prisma.enrollments.create({
      data: {
        userId,
        labId: id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      include: {
        labs: {
          select: { id: true, title: true, difficulty: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in lab',
      data: { enrollment }
    });
  } catch (error) {
    console.error('Enroll lab error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Start lab session (authenticated)
router.post('/:id/start', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;

    const enrollment = await prisma.enrollments.findFirst({
      where: { userId, labId: id, isActive: true }
    });

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        message: 'Must enroll in lab before starting session'
      });
    }

    const activeSession = await prisma.lab_sessions.findFirst({
      where: { userId, labId: id, status: 'RUNNING' }
    });

    if (activeSession) {
      return res.status(400).json({
        success: false,
        message: 'Lab session already active',
        data: { session: activeSession }
      });
    }

    const session = await prisma.lab_sessions.create({
      data: {
        userId,
        labId: id,
        status: 'RUNNING',
        startedAt: new Date()
      },
      include: {
        labs: {
          select: {
            id: true,
            title: true,
            dockerImage: true,
            port: true,
            environment: true,
            instructions: true,
            hints: true,
            flag: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Lab session started',
      data: { session }
    });
  } catch (error) {
    console.error('Start lab session error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Stop lab session (authenticated)
router.post('/:id/stop', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    const { progress, completed } = req.body;

    const session = await prisma.lab_sessions.findFirst({
      where: { userId, labId: id, status: 'RUNNING' }
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'No active lab session found'
      });
    }

    const updatedSession = await prisma.lab_sessions.update({
      where: { id: session.id },
      data: {
        status: completed ? 'COMPLETED' : 'TERMINATED',
        progress: progress || session.progress,
        completedAt: completed ? new Date() : null,
        endedAt: new Date()
      }
    });

    if (completed) {
      await prisma.user_progress.upsert({
        where: {
          userId_labId: { userId, labId: id }
        },
        update: {
          completed: true,
          lastAttemptAt: new Date(),
          attempts: { increment: 1 }
        },
        create: {
          userId,
          labId: id,
          completed: true,
          lastAttemptAt: new Date(),
          attempts: 1
        }
      });
    }

    res.json({
      success: true,
      message: `Lab session ${completed ? 'completed' : 'stopped'}`,
      data: { session: updatedSession }
    });
  } catch (error) {
    console.error('Stop lab session error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
