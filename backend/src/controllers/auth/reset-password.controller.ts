import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient, TokenType } from '@prisma/client';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { token, newPassword } = req.body;

    // Find token
    const resetToken = await prisma.token.findFirst({
      where: {
        token,
        type: TokenType.PASSWORD_RESET,
        expiresAt: { gt: new Date() },
        usedAt: null
      },
      include: { user: true }
    });

    if (!resetToken) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Hash new password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '10');
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user password
    await prisma.user.update({
      where: { id: resetToken.user.id },
      data: { password: hashedPassword }
    });

    // Mark token as used
    await prisma.token.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() }
    });

    // Revoke all refresh tokens for this user
    await prisma.refreshToken.updateMany({
      where: { 
        userId: resetToken.user.id,
        revokedAt: null
      },
      data: { revokedAt: new Date() }
    });

    res.json({
      success: true,
      message: 'Password reset successfully. Please login with your new password.'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
