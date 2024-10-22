import { pool } from '../../database';
import { CategoryResponseDto, CreateCategoryDto } from './dto/category.schema';

export class CategoryRepository {
	async findAll() {
		const res = await pool.query<CategoryResponseDto>(`
			SELECT categories.category_id, categories.name, COUNT(movie_category.movie_id) AS movie_count
			FROM categories
			LEFT JOIN movie_category ON movie_category.category_id = categories.category_id
			GROUP BY categories.category_id, categories.name
			ORDER BY categories.name ASC;
			`);
		return res.rows;
	}

	async findOne(id: number) {
		const res = await pool.query<CategoryResponseDto>(
			'SELECT * FROM categories WHERE category_id = $1',
			[id],
		);
		return res.rows[0];
	}

	async findByName(name: string) {
		const res = await pool.query<CategoryResponseDto>('SELECT * FROM categories WHERE name = $1', [
			name,
		]);
		return res.rows[0];
	}

	async delete(id: number) {
		const res = await pool.query<CategoryResponseDto>(
			'DELETE FROM categories WHERE category_id = $1 RETURNING *',
			[id],
		);
		return res.rows[0];
	}

	async create(createCategoryDto: CreateCategoryDto) {
		const res = await pool.query<CategoryResponseDto>(
			'INSERT INTO categories (name) VALUES ($1) RETURNING *',
			[createCategoryDto.name],
		);
		return res.rows[0];
	}
}
