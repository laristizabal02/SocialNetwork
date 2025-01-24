import { Router } from 'express';
const router = Router();
//import appRoutes from './appRoutes.js';
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';
//router.use('/apps', appRoutes);
router.use('/users', userRoutes);
router.use('/thought', thoughtRoutes);
export default router;
