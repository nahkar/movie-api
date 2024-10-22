import { z } from 'zod';

import { UserService } from '../user.service';

const userService = new UserService();

const baseUserSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(4, 'Password is required'),
});

export const createUserSchema = baseUserSchema.refine(
	async (data) => {
		const user = await userService.findByEmail(data.email);

		return !user;
	},
	{
		path: ['email'],
		message: 'Email already exists',
	},
);

export type CreateUserDto = z.infer<typeof createUserSchema>;

export const userResponseSchema = baseUserSchema.omit({ password: true }).extend({
	user_id: z.string(),
});
export const userResponseQuerySchema = baseUserSchema.extend({
	user_id: z.string(),
});

export type UserResponseDto = z.infer<typeof userResponseSchema>;
export type UserResponseQueryDto = z.infer<typeof userResponseQuerySchema>;
