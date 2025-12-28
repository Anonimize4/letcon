import express from 'express';
import { Router } from 'express';

const router = Router();

// Lab routes
router.get('/', (req, res) => {
  res.json({ message: 'Get labs' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get lab ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create lab' });
});

router.post('/:id/start', (req, res) => {
  res.json({ message: `Start lab ${req.params.id}` });
});

router.post('/:id/stop', (req, res) => {
  res.json({ message: `Stop lab ${req.params.id}` });
});

export default router;
