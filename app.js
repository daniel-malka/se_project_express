const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const { router } = require('./routes');

const { PORT = 3001 } = process.env;
app.use(express());

mongoose.connect('mongodb://localhost:27017/mydb');

const bParse = bodyParser.urlencoded({ extended: true });

app.use((req, res, next) => {
  req.user = { _id: '6396391e4253469d435c19c7' };
  next();
});
app.use(bParse);
app.use(router);

app.use((req, res, next) => {
  req.user = {};
  next();
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
