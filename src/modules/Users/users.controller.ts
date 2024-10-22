import { Request, Response } from 'express';

import { CreateUserDto, createUserSchema } from './dto/user.schema';
import { UserService } from './user.service';

export class UserController {
	private userService: UserService;
	constructor() {
		this.userService = new UserService();
	}

	async getUsers(req: Request, res: Response) {
		const response = await this.userService.findAll();
		res.json(response);
	}

	async getUserById(req: Request, res: Response) {
		const { id } = req.params;
		const response = await this.userService.findOne(Number(id));
		res.json(response);
	}

	async deleteUser(req: Request, res: Response) {
		const { id } = req.params;
		const response = await this.userService.delete(Number(id));
		res.status(204).json(response);
	}

	async createUser(req: Request, res: Response) {
		try {
			const userData: CreateUserDto = await createUserSchema.parseAsync(req.body);
			const response = await this.userService.create(userData);
			res.status(201).json(response);
		} catch (error) {
			res.status(400).json(error);
		}
	}
}
