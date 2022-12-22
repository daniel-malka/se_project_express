const UserSchima = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  UserSchima.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'Validation Error') {
        const { errors } = err;
        const message = `${Object.values(errors)
          .map((error) => error.message)
          .join(', ')}`;
        res.status(400).send(message);
      } else {
        res.status(500).send({ message: 'somthing went wrong..' });
      }
    });
};
const updateUserData = (req, res) => {
  const { body } = req;
  const id = req.user._id;
  UserSchima.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error(`User with this id (${id}) was not found`);
      error.status = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `the user id (${id}) is not correct` });
      } else if (res.status === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'somthing went wrong' });
      }
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return res.status(400).send({ message: 'name and about cant be empty' });
  }

  return updateUserData(req, res);
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    return res.status(400).send({ message: 'avatar cant be empty' });
  }

  return updateUserData(req, res);
};

const getUsers = (req, res) => {
  UserSchima.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() =>
      res.status(500).send({ message: 'An error has occured on server side' })
    );
};
const getUser = (req, res) => {
  const { id } = req.params;
  UserSchima.findById(id)
    .orFail(() => {
      const error = new Error('User id was not found');
      error.status = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Invalid format');
      } else if (err.status === 404) {
        res.status(404).send(err.message);
      } else {
        res.status(500).send(err.message);
      }
    });
};

const getUserId = (req, res) => {
  const { id } = req.params;
  UserSchima.findById(id)
    .orFail(() => {
      const error = new Error('No user found with this Id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ Error: err.message });
      } else if (err.statusCode === 404) {
        res.status(404).send({ Error: `${err.message}` });
      } else {
        res.status(500).send({ Error: 'An error has occured' });
      }
    });
};

module.exports = {
  createUser,
  updateUserInfo,
  updateUserAvatar,
  getUsers,
  getUser,
  getUserId,
};
