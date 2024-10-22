import { CategoryService } from 'src/modules/Categories/category.service';
import { z } from 'zod';

import { MovieService } from '../movie.service';

const movieService = new MovieService();
const categoryService = new CategoryService();

const baseMovieSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	image_url: z.string().optional(),
	release_date: z.date().optional(),
	created_at: z.date().default(() => new Date()),
	updated_at: z.date().default(() => new Date()),
	view_count: z.number().default(0),
	category_id: z.number(),
});

export const createMovieSchema = baseMovieSchema
	.refine(
		async (data) => {
			const movie = await movieService.findByName(data.name);
			return !movie;
		},
		{
			path: ['name'],
			message: 'Movie already exists',
		},
	)
	.refine(
		async (data) => {
			const category = await categoryService.findOne(data.category_id);
			return category;
		},
		{
			path: ['category_id'],
			message: 'Category does not exists',
		},
	);

export type CreateMovieDto = z.infer<typeof createMovieSchema>;

export const movieResponseSchema = baseMovieSchema.extend({
	movie_id: z.string(),
});

export type MovieResponseDto = z.infer<typeof movieResponseSchema>;
