const path = require("path");
const getDataFromFile = require("../helpers/files");

const dataPath = path.join(__dirname, "..", "data", "users.json");

const getUsers = (req, res) => {
  getDataFromFile(dataPath)
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: "An error occurred" }));
};

const getUserId = (req, res) => {
  getDataFromFile(dataPath)
    .then((users) => users.find((user) => user._id === req.params.id))
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User ID not found" });
      } else {
        res.status(200).send(user);
      }
    })
    .catch(() => {
      res.status(500).send({ message: "Requested resource not found" });
    });
};

module.exports = { getUsers, getUserId };
