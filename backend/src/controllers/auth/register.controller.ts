import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma, isUsingNeonDatabase, safeQuery, getConnectionState } from '../../config/database';
import { validationResult } from 'express-validator';
import config from '../../config/env';

export const register = async (req: Request, res: Response) => {
  const startTime = Date.now();
  const { email, username, password, firstName, lastName } = req.body;
  
  console.log(`[Register] Attempt for email: ${email}, username: ${username}`);
  console.log(`[Register] DB Connection State: ${getConnectionState() ? 'Connected' : 'Disconnected'}`);

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('[Register] Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    // Log database being used for debugging
    console.log(`[Register] Using ${isUsingNeonDatabase() ? 'Neon' : 'Local'} database`);
    console.log(`[Register] Environment: ${config.NODE_ENV}`);

    // Use safeQuery wrapper to handle connection issues
    const existingUser = await safeQuery(
      async () => {
        // Check if user already exists
        return await prisma.user.findFirst({
          where: {
            OR: [
              { email },
              { username }
            ]
          }
        });
      },
      'register-find-existing-user'
    );

    if (existingUser) {
      console.log('[Register] User already exists:', email, username);
      return res.status(409).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Hash password with production-strength rounds
    const saltRounds = config.BCRYPT_ROUNDS;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user using safeQuery
    const user = await safeQuery(
      async () => {
        return await prisma.user.create({
          data: {
            email,
            username,
            password: hashedPassword,
            firstName,
            lastName,
            role: 'USER'
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
      },
      'register-create-user'
    );

    const duration = Date.now() - startTime;
    console.log(`[Register] User ${user.email} registered successfully in ${duration}ms`);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully. You can now login.',
      data: {
        user
      }
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[Register] Error after ${duration}ms:`, error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint') || error.message.includes('P2002')) {
        console.error('[Register] Duplicate key violation');
        return res.status(409).json({
          success: false,
          message: 'User with this email or username already exists'
        });
      }
      
      if (error.message.includes('connection') || 
          error.message.includes('database') ||
          error.message.includes('Closed')) {
        console.error('[Register] Database connection issue detected');
        return res.status(503).json({
          success: false,
          message: 'Database service unavailable. Please try again later.'
        });
      }
    }
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
