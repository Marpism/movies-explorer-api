const movieRouter = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const { createMovie, deleteMovie, getMovies } = require('../controllers/movies');
const { urlValidator, ruValidator, enValidator } = require('../utils/constants');

movieRouter.get('/', getMovies);

movieRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().min(2).max(30).required(),
      director: Joi.string().min(2).max(30).required(),
      duration: Joi.number().required(),
      year: Joi.string().min(2).required(),
      description: Joi.string().min(2).required(),
      image: Joi.string().pattern(urlValidator).required(),
      trailerLink: Joi.string().pattern(urlValidator).required(),
      thumbnail: Joi.string().pattern(urlValidator).required(),
      // owner: Joi.string().required(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().pattern(ruValidator).required(),
      nameEN: Joi.string().pattern(enValidator).required(),
    }),
  }),
  createMovie,
);

movieRouter.delete('/:_Id', deleteMovie);

movieRouter.use(errors());

module.exports = movieRouter;
