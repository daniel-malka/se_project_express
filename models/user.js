const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const { urlRegex } = require('../utils/regex');

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.match(urlRegex),
        message: 'invalid url',
      },
    },
  },
  { versionKey: false }
);
module.exports = model('user', userSchema);
