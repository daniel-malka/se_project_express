const userRouter = require("express").Router();
const { getUsers, getUserId } = require("../controllers/users");

userRouter.get("/", getUsers);

userRouter.get("/:id", getUserId);

module.exports = userRouter;
