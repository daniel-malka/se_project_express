const express = require("express");

const app = express();

const { PORT = 3000 } = process.env;

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use("/users", usersRouter);
app.use("/card", cardsRouter);

app.get("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
