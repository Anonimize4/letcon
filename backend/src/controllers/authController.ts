import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient, TokenType, UserRole } from '@prisma/client';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

// Generate JWT tokens
const generateTokens = (userId: string) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' } as jwt.SignOptions
  );
  
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' } as jwt.SignOptions
  );
  
  return { accessToken, refreshToken };
};

// Register new user
export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { email, username, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '10');
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        role: UserRole.USER
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true
      }
    });

    // Generate email verification token
    const verificationToken = uuidv4();
    await prisma.token.create({
      data: {
        token: verificationToken,
        type: TokenType.EMAIL_VERIFICATION,
        userId: user.id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    });

    // TODO: Send verification email

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email to verify your account.',
      data: {
        user,
        verificationToken // Only for development, remove in production
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    // Store refresh token in database
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      }
    });

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Verify email
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
        type: TokenType.EMAIL_VERIFICATION,
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

    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Forgot password
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
        type: TokenType.PASSWORD_RESET,
        userId: user.id,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
      }
    });

    // TODO: Send reset email

    res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.',
      data: {
        resetToken // Only for development, remove in production
      }
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Reset password
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

// Refresh token
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || 'fallback-secret') as { userId: string };

    // Check if refresh token exists and is valid
    const storedToken = await prisma.refreshToken.findFirst({
      where: {
        token: refreshToken,
        userId: decoded.userId,
        expiresAt: { gt: new Date() },
        revokedAt: null
      }
    });

    if (!storedToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token'
      });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.userId);

    // Revoke old refresh token
    await prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revokedAt: new Date() }
    });

    // Store new refresh token
    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: decoded.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      }
    });

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token'
    });
  }
};

// Logout
export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Revoke refresh token
    await prisma.refreshToken.updateMany({
      where: { token: refreshToken },
      data: { revokedAt: new Date() }
    });

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Logout from all devices
export const logoutAll = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    // Revoke all refresh tokens for this user
    await prisma.refreshToken.updateMany({
      where: { 
        userId,
        revokedAt: null
      },
      data: { revokedAt: new Date() }
    });

    res.json({
      success: true,
      message: 'Logged out from all devices successfully'
    });
  } catch (error) {
    console.error('Logout all error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
