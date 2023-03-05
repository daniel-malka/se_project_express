const express = require('express');

const app = express();
const mongoose = require('mongoose');
const { router } = require('./routes');

const { PORT = 3001 } = process.env;
app.use(express());

mongoose.connect('mongodb://localhost:27017/mydb');
app.use((req, res, next) => {
  req.user = { _id: '6396391e4253469d435c19c7' };
  next();
});

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
