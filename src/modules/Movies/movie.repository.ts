import { pool } from '../../database';
import { CreateMovieDto, MovieResponseDto } from './dto/movie.schema';

export class MovieRepository {
	async findAll() {
		const res = await pool.query<MovieResponseDto[]>('SELECT * FROM movies');
		return res.rows;
	}

	async findOne(id: number) {
		const res = await pool.query<MovieResponseDto>('SELECT * FROM movies WHERE movie_id = $1', [
			id,
		]);
		return res.rows[0];
	}
	async findByName(name: string) {
		const res = await pool.query<MovieResponseDto>('SELECT * FROM movies WHERE name = $1', [name]);
		return res.rows[0];
	}

	async delete(id: number) {
		const res = await pool.query<MovieResponseDto>(
			'DELETE FROM movies WHERE movie_id = $1 RETURNING *',
			[id],
		);
		return res.rows[0];
	}

	async create(createMovieDto: CreateMovieDto) {
		const res = await pool.query<MovieResponseDto>(
			'INSERT INTO movies (name, description, image_url, release_date) VALUES ($1 , $2, $3, $4) RETURNING *',
			[
				createMovieDto.name,
				createMovieDto.description,
				createMovieDto.image_url,
				createMovieDto.release_date,
			],
		);
		await pool.query('INSERT INTO movie_category (movie_id, category_id) VALUES ($1, $2)', [
			res.rows[0].movie_id,
			createMovieDto.category_id,
		]);
		return res.rows[0];
	}
}
