import express from 'express';

import { CategoryController } from './category.controller';

export const categoryRouter = express.Router();

const categoryController = new CategoryController();

categoryRouter.get('/', categoryController.getCategories.bind(categoryController));
categoryRouter.get('/:id', categoryController.getCategoryById.bind(categoryController));
categoryRouter.delete('/:id', categoryController.deleteCategory.bind(categoryController));
categoryRouter.post('/', categoryController.createCategory.bind(categoryController));
