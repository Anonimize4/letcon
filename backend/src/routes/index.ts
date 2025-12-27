import express from 'express'
import authRoutes from './v1/auth.routes'
import userRoutes from './v1/user.routes'
import learningRoutes from './v1/learning.routes'
import labRoutes from './v1/lab.routes'
import challengeRoutes from './v1/challenge.routes'
import communityRoutes from './v1/community.routes'
import adminRoutes from './v1/admin.routes'
import adminLabBuilderRoutes from './v1/admin/lab-builder.routes'

const router = express.Router()

// API routes
router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/learning', learningRoutes)
router.use('/labs', labRoutes)
router.use('/challenges', challengeRoutes)
router.use('/community', communityRoutes)
router.use('/admin', adminRoutes)
router.use('/admin/lab-builder', adminLabBuilderRoutes)

export default router
