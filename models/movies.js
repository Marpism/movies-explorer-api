const validator = require('validator');
const mongoose = require('mongoose');

const { isURL } = validator;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return isURL(url);
      },
      message: 'Введены некорректные данные',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return isURL(url);
      },
      message: 'Введены некорректные данные',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return isURL(url);
      },
      message: 'Введены некорректные данные',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true, // ВАЛИДИРОВАТЬ РЕГЕКСАМИ ПО РУССКИМ И АНГЛ БУКВАМ
  },
  // likes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user',
  //   default: [],
  // }],

});

module.exports = mongoose.model('movie', movieSchema);
