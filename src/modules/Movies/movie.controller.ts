import { Request, Response } from 'express';

import { CreateMovieDto, createMovieSchema } from './dto/movie.schema';
import { MovieService } from './movie.service';

export class MovieController {
	movieService: MovieService;
	constructor() {
		this.movieService = new MovieService();
	}

	async getMovies(req: Request, res: Response) {
		const movies = await this.movieService.findAll();
		res.json(movies);
	}

	async getMovieById(req: Request, res: Response) {
		const { id } = req.params;
		const movie = await this.movieService.findOne(Number(id));
		res.json(movie);
	}

	async getMovieByName(req: Request, res: Response) {
		const { name } = req.params;
		const movie = await this.movieService.findByName(name);
		res.json(movie);
	}

	async deleteMovie(req: Request, res: Response) {
		const { id } = req.params;
		const movie = await this.movieService.delete(Number(id));
		res.json(movie);
	}

	async createMovie(req: Request, res: Response) {
		const movieData: CreateMovieDto = await createMovieSchema.parseAsync({
			...req.body,
			release_date: new Date(req.body.release_date),
		});
		const movie = await this.movieService.create(movieData);
		res.json(movie);
	}
}
