import { Request, Response } from 'express';

import { CategoryService } from './category.service';
import { CreateCategoryDto, createCategorySchema } from './dto/category.schema';

export class CategoryController {
	private categoryService: CategoryService;
	constructor() {
		this.categoryService = new CategoryService();
	}

	async getCategories(req: Request, res: Response) {
		const response = await this.categoryService.findAll();
		res.json(response);
	}

	async getCategoryById(req: Request, res: Response) {
		const { id } = req.params;
		const response = await this.categoryService.findOne(Number(id));
		res.json(response);
	}

	async deleteCategory(req: Request, res: Response) {
		const { id } = req.params;
		const response = await this.categoryService.delete(Number(id));
		res.json(response);
	}

	async createCategory(req: Request, res: Response) {
		const categoryData: CreateCategoryDto = await createCategorySchema.parseAsync(req.body);
		const response = await this.categoryService.create(categoryData);
		res.status(201).json(response);
	}
}
