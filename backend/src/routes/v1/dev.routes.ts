import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config/env';
import { userDB as prisma } from '../../config/database';

const router = Router();

// Guard all routes in this file behind env flag
const ensureBypassEnabled = (req: Request, res: Response) => {
  if (process.env.AUTH_DEV_BYPASS !== 'true') {
    res.status(403).json({ success: false, message: 'Dev bypass disabled' });
    return false;
  }
  return true;
};

function generateTokens(userId: string) {
  const accessToken = jwt.sign(
    { userId },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN } as jwt.SignOptions
  );
  const refreshToken = jwt.sign(
    { userId },
    config.JWT_SECRET,
    { expiresIn: config.REFRESH_TOKEN_EXPIRES_IN } as jwt.SignOptions
  );
  return { accessToken, refreshToken };
}

// POST /api/v1/dev/mint-token { email }
router.post('/mint-token', async (req: Request, res: Response) => {
  if (!ensureBypassEnabled(req, res)) return;
  try {
    const { email } = req.body as { email?: string };
    if (!email) {
      return res.status(400).json({ success: false, message: 'email is required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    // Optionally store refresh token similar to login flow if table exists
    try {
      // @ts-ignore - optional model depending on schema
      await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id } });
    } catch (_) {
      // ignore if model/table not present
    }

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: (user as any).username || user.email,
          role: (user as any).role || 'USER'
        },
        accessToken,
        refreshToken
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err?.message || 'Failed to mint token' });
  }
});

export default router;
