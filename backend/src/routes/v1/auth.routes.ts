import { Router } from 'express';
import {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
  logoutAll
} from '../../controllers/auth';
import {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  refreshTokenValidation,
  logoutValidation,
  tokenParamValidation
} from '../../schemas/auth.validation';

const router = Router();

// Register new user
router.post('/register', registerValidation, register);

// Login user
router.post('/login', loginValidation, login);

// Verify email
router.get('/verify-email/:token', tokenParamValidation, verifyEmail);

// Forgot password
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);

// Reset password
router.post('/reset-password', resetPasswordValidation, resetPassword);

// Refresh access token
router.post('/refresh-token', refreshTokenValidation, refreshToken);

// Logout (revoke refresh token)
router.post('/logout', logoutValidation, logout);

// Logout from all devices
router.post('/logout-all', logoutAll);

export default router;
