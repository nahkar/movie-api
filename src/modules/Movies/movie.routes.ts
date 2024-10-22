import express from 'express';

import { MovieController } from './movie.controller';

export const movieRouter = express.Router();

const movieController = new MovieController();

movieRouter.get('/', movieController.getMovies.bind(movieController));
movieRouter.get('/:id', movieController.getMovieById.bind(movieController));
movieRouter.delete('/:id', movieController.deleteMovie.bind(movieController));
movieRouter.post('/', movieController.createMovie.bind(movieController));
