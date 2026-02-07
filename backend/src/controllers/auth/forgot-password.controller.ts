import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { userDB as prisma } from '../../config/database';
import { validationResult } from 'express-validator';

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { email } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't reveal that user doesn't exist
      return res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.'
      });
    }

    // Generate reset token
    const resetToken = uuidv4();
    await prisma.token.create({
      data: {
        token: resetToken,
        type: 'PASSWORD_RESET',
        userId: user.id,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
      }
    });

    // TODO: Send reset email

    return res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.',
      data: {
        resetToken // Only for development, remove in production
      }
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
