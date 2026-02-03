import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import {
  createTerminalSession,
  getTerminalSession,
  terminateTerminalSession,
  getUserTerminalSessions,
  terminateAllUserSessions,
  getTerminalStats
} from '../../controllers/terminal.controller';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

/**
 * @route   POST /api/v1/terminal/sessions
 * @desc    Create a new terminal session for a container
 * @access  Private
 */
router.post('/sessions', createTerminalSession);

/**
 * @route   GET /api/v1/terminal/sessions
 * @desc    Get all terminal sessions for the current user
 * @access  Private
 */
router.get('/sessions', getUserTerminalSessions);

/**
 * @route   GET /api/v1/terminal/sessions/:sessionId
 * @desc    Get terminal session details
 * @access  Private
 */
router.get('/sessions/:sessionId', getTerminalSession);

/**
 * @route   DELETE /api/v1/terminal/sessions/:sessionId
 * @desc    Terminate a terminal session
 * @access  Private
 */
router.delete('/sessions/:sessionId', terminateTerminalSession);

/**
 * @route   DELETE /api/v1/terminal/sessions
 * @desc    Terminate all terminal sessions for the current user
 * @access  Private
 */
router.delete('/sessions', terminateAllUserSessions);

/**
 * @route   GET /api/v1/terminal/stats
 * @desc    Get terminal service statistics
 * @access  Private (Admin only)
 */
router.get('/stats', authorize('admin'), getTerminalStats);

export default router;
