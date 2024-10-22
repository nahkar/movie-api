import { CreateMovieDto } from './dto/movie.schema';
import { MovieRepository } from './movie.repository';

export class MovieService {
	private movieRepository: MovieRepository;
	constructor() {
		this.movieRepository = new MovieRepository();
	}

	async findAll() {
		const res = await this.movieRepository.findAll();
		return res;
	}

	async findOne(id: number) {
		const res = await this.movieRepository.findOne(id);
		return res;
	}

	async findByName(name: string) {
		const res = await this.movieRepository.findByName(name);
		return res;
	}

	async delete(id: number) {
		const res = await this.movieRepository.delete(id);
		return res;
	}

	async create(createMovieDto: CreateMovieDto) {
		const res = await this.movieRepository.create(createMovieDto);
		return res;
	}
}
