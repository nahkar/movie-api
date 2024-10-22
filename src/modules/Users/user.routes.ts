import express from 'express';

import { UserController } from './users.controller';

export const userRouter = express.Router();

const userController = new UserController();

userRouter.get('/', userController.getUsers.bind(userController));
userRouter.get('/:id', userController.getUserById.bind(userController));
userRouter.delete('/:id', userController.deleteUser.bind(userController));
userRouter.post('/', userController.createUser.bind(userController));
