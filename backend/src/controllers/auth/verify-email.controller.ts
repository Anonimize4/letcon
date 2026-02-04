import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required'
      });
    }

    // Find token
    const verificationToken = await prisma.token.findFirst({
      where: {
        token: token,
        type: 'EMAIL_VERIFICATION',
        expiresAt: { gt: new Date() },
        usedAt: null
      },
      include: { user: true }
    });

    if (!verificationToken) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    // Mark token as used
    await prisma.token.update({
      where: { id: verificationToken.id },
      data: { usedAt: new Date() }
    });

    // TODO: Activate user account if needed

    return res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
