import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma, isUsingNeonDatabase } from '../../config/database';
import { validationResult } from 'express-validator';
import config from '../../config/env';

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

    // Log database being used for debugging
    console.log(`Registration attempt - Using ${isUsingNeonDatabase() ? 'Neon' : 'Local'} database`);
    console.log(`Environment: ${config.NODE_ENV}`);

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

    // Hash password with production-strength rounds
    const saltRounds = config.BCRYPT_ROUNDS;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
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

    console.log(`User registered successfully: ${user.email} (${isUsingNeonDatabase() ? 'Neon' : 'Local'} DB)`);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully. You can now login.',
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return res.status(409).json({
          success: false,
          message: 'User with this email or username already exists'
        });
      }
      
      if (error.message.includes('connection') || error.message.includes('database')) {
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
