const { Schema } = require('mongoose');
const { urlRegex } = require('../utils/regex');
const mongoose = require('mongoose');
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
module.exports = mongoose.model('user', userSchema);
