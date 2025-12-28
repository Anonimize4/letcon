import express from 'express';
import { Router } from 'express';

const router = Router();

// Admin routes
router.get('/users', (req, res) => {
  res.json({ message: 'Get all users (admin)' });
});

router.get('/stats', (req, res) => {
  res.json({ message: 'Get platform statistics' });
});

router.post('/labs', (req, res) => {
  res.json({ message: 'Create lab (admin)' });
});

router.delete('/users/:id', (req, res) => {
  res.json({ message: `Delete user ${req.params.id} (admin)` });
});

export default router;
