const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const CONFLICT_ERROR = 409;

const urlValidator = (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/);
const ruValidator = (/^[?!,.а-яА-ЯёЁ0-9\s]+$/);
const enValidator = (/^[?!,.a-zA-Z0-9\s]+$/);

module.exports = {
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT_ERROR,
  urlValidator,
  ruValidator,
  enValidator,
};
