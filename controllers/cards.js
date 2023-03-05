const CardSchema = require('../models/card');

const getCards = (req, res) => {
  CardSchema.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'An error occurred' }));
};

const createCard = (req, res) => {
  const { name, link, owner } = req.body;
  CardSchema.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const { errors } = err;
        res.status(400).send({
          message: `${Object.values(errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      } else {
        res.status(500).send({ message: 'An error occured' });
      }
    });
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  CardSchema.findById(id)
    .orFail(() => {
      const error = new Error('No card was found with this id');
      error.status = 404;
      throw error;
    })
    .then((card) => CardSchema.deleteOne(card).then(() => res.send(card)))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card id' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'an error has occured' });
      }
    });
};

const updateLike = (req, res, operator) => {
  const { id } = req.params;
  CardSchema.findByIdAndUpdate(
    id,
    { [operator]: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error(`no card found with this id (${id})`);
      error.status = 404;
      throw error;
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(400).send({ message: 'invalid card id' });
      } else if (err.statusCode === 500) {
        res.status(500).send({ message: 'somthing went wrong' });
      }
    });
};

const likeCard = (req, res) => updateLike(req, res, '$addToSet');
const dislikeCard = (req, res) => updateLike(req, res, '$pull');

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
