import { Router, Response } from 'express';
import { prisma } from '../../config/database';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

// Get current user profile
router.get('/profile', authenticate, async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        bio: true,
        company: true,
        location: true,
        website: true,
        createdAt: true,
        lastLoginAt: true,
        _count: {
          select: {
            enrollments: true,
            certificates: true,
            lab_sessions: true
          }
        }
      }
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, bio, company, location, website, avatar } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        bio,
        company,
        location,
        website,
        avatar
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        bio: true,
        company: true,
        location: true,
        website: true,
        updatedAt: true
      }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: updatedUser }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user's enrolled labs
router.get('/enrollments', authenticate, async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;

    const enrollments = await prisma.enrollments.findMany({
      where: { userId },
      include: {
        labs: {
          select: {
            id: true,
            title: true,
            description: true,
            difficulty: true,
            estimatedTime: true,
            tags: true,
            categoryId: true,
            lab_categories: {
              select: {
                id: true,
                name: true,
                color: true
              }
            }
          }
        }
      },
      orderBy: { enrolledAt: 'desc' }
    });

    res.json({
      success: true,
      data: { enrollments }
    });
  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user's certificates
router.get('/certificates', authenticate, async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;

    const certificates = await prisma.certificates.findMany({
      where: { userId },
      include: {
        labs: {
          select: {
            id: true,
            title: true,
            difficulty: true
          }
        }
      },
      orderBy: { issuedAt: 'desc' }
    });

    res.json({
      success: true,
      data: { certificates }
    });
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user's lab sessions
router.get('/lab-sessions', authenticate, async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const { limit = 10, offset = 0 } = req.query;

    const sessions = await prisma.lab_sessions.findMany({
      where: { userId },
      include: {
        labs: {
          select: {
            id: true,
            title: true,
            difficulty: true
          }
        }
      },
      orderBy: { startedAt: 'desc' },
      take: Number(limit),
      skip: Number(offset)
    });

    res.json({
      success: true,
      data: { sessions }
    });
  } catch (error) {
    console.error('Get lab sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user's progress
router.get('/progress', authenticate, async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;

    const progress = await prisma.user_progress.findMany({
      where: { userId },
      include: {
        labs: {
          select: {
            id: true,
            title: true,
            difficulty: true,
            categoryId: true,
            lab_categories: {
              select: {
                id: true,
                name: true,
                color: true
              }
            }
          }
        }
      },
      orderBy: { lastAttemptAt: 'desc' }
    });

    res.json({
      success: true,
      data: { progress }
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
