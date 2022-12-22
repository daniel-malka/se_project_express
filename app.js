const express = require('express');

const app = express();
const mongoose = require('mongoose');
const { router } = require('./routes');

const { PORT = 3000 } = process.env;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydb');

app.use((req, res, next) => {
  req.user = { _id: '6396391e4253469d435c19c7' };
  next();
});

app.use(router);

app.use((req, res, next) => {
  req.user = {};
  next();
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
