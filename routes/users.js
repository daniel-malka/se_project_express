const router = require('express').Router();

const {
  updateUserInfo,
  updateUserAvatar,
  getUsers,
  getUserId,
  createUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.post('/users/me', createUser);
router.get('/users/:id', getUserId);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);
module.exports = { userRouter: router };
