import { z } from 'zod';

import { CategoryService } from '../category.service';

const categoryService = new CategoryService();

const baseCategorySchema = z.object({
	name: z.string(),
});

export const createCategorySchema = baseCategorySchema.refine(
	async (data) => {
		const category = await categoryService.findByName(data.name);

		return !category;
	},
	{
		path: ['name'],
		message: 'Category already exists',
	},
);

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;

export const categoryResponseSchema = baseCategorySchema.extend({
	category_id: z.string(),
	movie_count: z.number().default(0),
});

export type CategoryResponseDto = z.infer<typeof categoryResponseSchema>;
