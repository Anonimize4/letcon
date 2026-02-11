import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma, isUsingNeonDatabase, safeQuery, getConnectionState } from '../../config/database';
import { validationResult } from 'express-validator';
import config from '../../config/env';

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

export const login = async (req: Request, res: Response) => {
  const startTime = Date.now();
  const { email, password, username } = req.body;
  
  console.log(`[Login] Attempt for email: ${email || 'N/A'}, username: ${username || 'N/A'}`);
  console.log(`[Login] DB Connection State: ${getConnectionState() ? 'Connected' : 'Disconnected'}`);

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('[Login] Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    // Log database being used for debugging
    console.log(`[Login] Using ${isUsingNeonDatabase() ? 'Neon' : 'Local'} database`);
    console.log(`[Login] Environment: ${config.NODE_ENV}`);

    // Use safeQuery wrapper to handle connection issues
    const user = await safeQuery(
      async () => {
        // Try to find user by email or username
        if (email) {
          return await prisma.user.findUnique({
            where: { email }
          });
        } else if (username) {
          return await prisma.user.findUnique({
            where: { username }
          });
        }
        return null;
      },
      'login-find-user'
    );

    if (!user) {
      console.log('[Login] User not found');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('[Login] Invalid password for user:', email || username);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    // Store refresh token in database using safeQuery
    await safeQuery(
      async () => {
        await prisma.refreshToken.create({
          data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
          }
        });
      },
      'login-create-refresh-token'
    );

    // Update last login using safeQuery
    await safeQuery(
      async () => {
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() }
        });
      },
      'login-update-last-login'
    );

    const duration = Date.now() - startTime;
    console.log(`[Login] User ${user.email} logged in successfully in ${duration}ms`);

    return res.json({
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
    const duration = Date.now() - startTime;
    console.error(`[Login] Error after ${duration}ms:`, error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('connection') || 
          error.message.includes('database') ||
          error.message.includes('Closed')) {
        console.error('[Login] Database connection issue detected');
        return res.status(503).json({
          success: false,
          message: 'Authentication service unavailable. Please try again later.'
        });
      }
    }
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
