const process = require('process');
const mongoose = require('mongoose');
const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,

}).then(() => {
  console.log('Соединение с ДБ установлено');
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
