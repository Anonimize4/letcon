import { Router } from 'express'
import {
  createTerminalSession,
  getTerminalSession,
  getUserTerminalSessions,
  terminateTerminalSession,
  terminateAllUserSessions,
  getTerminalStats
} from '../../controllers/terminal.controller'
import { authenticate } from '../../middleware/auth.middleware'

const router = Router()

/**
 * @route   POST /api/v1/terminal/sessions
 * @desc    Create a new terminal session for a container
 * @access  Private
 */
router.post('/sessions', authenticate, createTerminalSession)

/**
 * @route   GET /api/v1/terminal/sessions
 * @desc    Get all terminal sessions for the current user
 * @access  Private
 */
router.get('/sessions', authenticate, getUserTerminalSessions)

/**
 * @route   GET /api/v1/terminal/sessions/:sessionId
 * @desc    Get terminal session details
 * @access  Private
 */
router.get('/sessions/:sessionId', authenticate, getTerminalSession)

/**
 * @route   DELETE /api/v1/terminal/sessions/:sessionId
 * @desc    Terminate a terminal session
 * @access  Private
 */
router.delete('/sessions/:sessionId', authenticate, terminateTerminalSession)

/**
 * @route   DELETE /api/v1/terminal/sessions
 * @desc    Terminate all terminal sessions for the current user
 * @access  Private
 */
router.delete('/sessions', authenticate, terminateAllUserSessions)

/**
 * @route   GET /api/v1/terminal/stats
 * @desc    Get terminal service statistics
 * @access  Private (Admin only)
 */
router.get('/stats', authenticate, getTerminalStats)

export default router
