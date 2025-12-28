import express from 'express';
import { Router } from 'express';

const router = Router();

// User routes
router.get('/', (req, res) => {
  res.json({ message: 'Get users endpoint' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

router.put('/:id', (req, res) => {
  res.json({ message: `Update user ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.json({ message: `Delete user ${req.params.id}` });
});

export default router;
