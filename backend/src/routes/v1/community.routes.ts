import express from 'express';
import { Router } from 'express';

const router = Router();

// Community routes
router.get('/forums', (req, res) => {
  res.json({ message: 'Get community forums' });
});

router.get('/discussions', (req, res) => {
  res.json({ message: 'Get discussions' });
});

router.post('/posts', (req, res) => {
  res.json({ message: 'Create community post' });
});

export default router;
