import express from 'express';
import { Router } from 'express';

const router = Router();

// Learning routes
router.get('/paths', (req, res) => {
  res.json({ message: 'Get learning paths' });
});

router.get('/courses', (req, res) => {
  res.json({ message: 'Get courses' });
});

router.post('/progress', (req, res) => {
  res.json({ message: 'Update learning progress' });
});

export default router;
