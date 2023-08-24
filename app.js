const process = require('process');
const mongoose = require('mongoose');
const express = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const router = require('./routes/index');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const cors = require('./middlewares/cors');

const { PORT = 4000 } = process.env;
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/filmdb', {
  useNewUrlParser: true,
}).then(() => {
  console.log('Соединение с ДБ установлено');
});

app.use(cors);

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), login);

app.use(auth);

app.use(router);

app.use('*', (req, res, next) => next(new NotFoundError('Страницы не существует')));
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
