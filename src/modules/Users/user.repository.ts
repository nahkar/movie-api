import { pool } from '../../database';
import { CreateUserDto, UserResponseQueryDto } from './dto/user.schema';

export class UserRepository {
	async findAll() {
		const res = await pool.query<UserResponseQueryDto>('SELECT * FROM users');
		return res.rows;
	}

	async findOne(id: number) {
		const res = await pool.query<UserResponseQueryDto>('SELECT * FROM users WHERE user_id = $1', [
			id,
		]);
		return res.rows[0];
	}

	async findByEmail(email: string) {
		const res = await pool.query<UserResponseQueryDto>('SELECT * FROM users WHERE email = $1', [
			email,
		]);
		return res.rows[0];
	}

	async delete(id: number) {
		const res = await pool.query<UserResponseQueryDto>(
			'DELETE FROM users WHERE user_id = $1 RETURNING *',
			[id],
		);
		return res.rows[0];
	}

	async create(createUserDto: CreateUserDto) {
		const res = await pool.query<UserResponseQueryDto>(
			'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
			[createUserDto.email, createUserDto.password],
		);
		return res.rows[0];
	}
}
