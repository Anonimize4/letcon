import express from 'express';
import { Router } from 'express';

const router = Router();

// Challenge routes
router.get('/', (req, res) => {
  res.json({ message: 'Get challenges' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get challenge ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create challenge' });
});

router.post('/:id/submit', (req, res) => {
  res.json({ message: `Submit solution for challenge ${req.params.id}` });
});

export default router;
