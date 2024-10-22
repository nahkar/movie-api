import bcrypt from 'bcrypt';

import { CreateUserDto, UserResponseQueryDto } from './dto/user.schema';
import { UserRepository } from './user.repository';

export class UserService {
	private userRepository: UserRepository;

	constructor() {
		this.userRepository = new UserRepository();
	}

	private extractPasswordFromUser(user: UserResponseQueryDto) {
		if (!user) return user;
		const { password: _, ...rest } = user;
		return rest;
	}

	private async hashPassword(password: string) {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	}

	private async verifyPassword(plainPassword: string, hashedPassword: string) {
		const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
		return isMatch;
	}

	async findAll() {
		const response = await this.userRepository.findAll();
		return response.map((user) => this.extractPasswordFromUser(user));
	}

	async findOne(id: number) {
		const response = await this.userRepository.findOne(id);
		return this.extractPasswordFromUser(response);
	}

	async findByEmail(email: string) {
		const response = await this.userRepository.findByEmail(email);
		return this.extractPasswordFromUser(response);
	}

	async delete(id: number) {
		const response = await this.userRepository.delete(id);
		return this.extractPasswordFromUser(response);
	}

	async create({ password, ...createUserDto }: CreateUserDto) {
		const hashedPassword = await this.hashPassword(password);

		const response = await this.userRepository.create({
			...createUserDto,
			password: hashedPassword,
		});

		return this.extractPasswordFromUser(response);
	}
}
