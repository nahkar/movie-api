import express from 'express';

import { categoryRouter } from '../modules/Categories/category.routes';
import { movieRouter } from '../modules/Movies/movie.routes';
import { userRouter } from '../modules/Users/user.routes';

export const router = express.Router();

router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/movies', movieRouter);

export default router;
