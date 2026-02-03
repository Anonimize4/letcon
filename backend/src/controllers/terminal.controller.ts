import { Request, Response } from 'express';
import { terminalService, TerminalSession } from '../services/terminal.service';

/**
 * Create a new terminal session for a container
 */
export const createTerminalSession = async (req: Request, res: Response) => {
  try {
    const { containerId } = req.body;
    const userId = req.user?.userId;

    if (!containerId) {
      return res.status(400).json({
        success: false,
        message: 'Container ID is required'
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    const session = await terminalService.createTerminalSession(containerId, userId);

    return res.status(201).json({
      success: true,
      data: {
        sessionId: session.id,
        containerId: session.containerId,
        url: session.url,
        port: session.port,
        createdAt: session.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating terminal session:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create terminal session'
    });
  }
};

/**
 * Get terminal session details
 */
export const getTerminalSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    const session = terminalService.getTerminalSession(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Terminal session not found'
      });
    }

    // Check if user owns this session
    if (session.userId !== userId!) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update activity
    terminalService.updateSessionActivity(sessionId!);

    return res.json({
      success: true,
      data: {
        sessionId: session.id,
        containerId: session.containerId,
        url: session.url,
        port: session.port,
        createdAt: session.createdAt,
        lastActivity: session.lastActivity
      }
    });
  } catch (error) {
    console.error('Error getting terminal session:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get terminal session'
    });
  }
};

/**
 * Terminate a terminal session
 */
export const terminateTerminalSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    const session = terminalService.getTerminalSession(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Terminal session not found'
      });
    }

    // Check if user owns this session
    if (session.userId !== userId!) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await terminalService.terminateTerminalSession(sessionId!);

    return res.json({
      success: true,
      message: 'Terminal session terminated successfully'
    });
  } catch (error) {
    console.error('Error terminating terminal session:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to terminate terminal session'
    });
  }
};

/**
 * Get all terminal sessions for the current user
 */
export const getUserTerminalSessions = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    const sessions = terminalService.getUserSessions(userId!);

    return res.json({
      success: true,
      data: sessions.map(session => ({
        sessionId: session.id,
        containerId: session.containerId,
        url: session.url,
        port: session.port,
        createdAt: session.createdAt,
        lastActivity: session.lastActivity
      }))
    });
  } catch (error) {
    console.error('Error getting user terminal sessions:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get terminal sessions'
    });
  }
};

/**
 * Terminate all terminal sessions for the current user
 */
export const terminateAllUserSessions = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    await terminalService.terminateUserSessions(userId!);

    return res.json({
      success: true,
      message: 'All terminal sessions terminated successfully'
    });
  } catch (error) {
    console.error('Error terminating all user sessions:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to terminate terminal sessions'
    });
  }
};

/**
 * Get terminal service statistics (admin only)
 */
export const getTerminalStats = async (req: Request, res: Response) => {
  try {
    // Check if user is admin
    if (req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const stats = terminalService.getStats();

    return res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting terminal stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get terminal statistics'
    });
  }
};
