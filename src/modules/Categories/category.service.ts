import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/category.schema';

export class CategoryService {
	private categoryRepository: CategoryRepository;

	constructor() {
		this.categoryRepository = new CategoryRepository();
	}

	async findAll() {
		const response = await this.categoryRepository.findAll();
		return response;
	}

	async findOne(id: number) {
		const response = await this.categoryRepository.findOne(id);
		return response;
	}

	async findByName(name: string) {
		const response = await this.categoryRepository.findByName(name);
		return response;
	}

	async delete(id: number) {
		const response = await this.categoryRepository.delete(id);
		return response;
	}

	async create(createCategoryDto: CreateCategoryDto) {
		const response = await this.categoryRepository.create(createCategoryDto);
		return response;
	}
}
