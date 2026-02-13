import express from 'express';
import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth.middleware';

const router: Router = Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize('admin'));

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

// ==========================================
// Lab Creator Routes - Accessible by admin and creator
// ==========================================
router.post('/creator/labs', authorize(['admin', 'creator']), (req, res) => {
  res.json({ message: 'Create lab (creator)' });
});

router.get('/creator/labs', authorize(['admin', 'creator']), (req, res) => {
  res.json({ message: 'Get creator labs' });
});

router.put('/creator/labs/:id', authorize(['admin', 'creator']), (req, res) => {
  res.json({ message: `Update lab ${req.params.id} (creator)` });
});

router.delete('/creator/labs/:id', authorize(['admin', 'creator']), (req, res) => {
  res.json({ message: `Delete lab ${req.params.id} (creator)` });
});

export default router;
