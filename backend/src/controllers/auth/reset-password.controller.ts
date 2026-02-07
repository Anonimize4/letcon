import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { userDB as prisma } from '../../config/database';
import { validationResult } from 'express-validator';

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

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required'
      });
    }

    // Find token
    const resetToken = await prisma.token.findFirst({
      where: {
        token: token,
        type: 'PASSWORD_RESET',
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
      where: { id: resetToken.userId },
      data: { password: hashedPassword }
    });

    // Mark token as used
    await prisma.token.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() }
    });

    return res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
