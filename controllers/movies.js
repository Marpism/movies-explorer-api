const Movie = require('../models/movies');
const BadReqError = require('../errors/BadReqError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthError = require('../errors/UnauthError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  CREATED, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;

  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(CREATED).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadReqError('переданы некорректные данные'));
      }
      return next(err);
    });
};

// # удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('Нельзя удалить чужой фильм');
      }
      return movie.deleteOne()
        .then((deletedMovie) => res.send({ message: `фильм ${deletedMovie._id} успешно удален` }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadReqError('переданы некорректные данные'));
      }
      return next(err);
    });
};

// # возвращает все сохранённые текущим пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};
