import { getAllUsers, postUser } from '../controllers/user.controller.js';
import {
  getBalancesByUser,
  postBalance,
} from '../controllers/balance.controller.js';
import { registerUser, login } from '../controllers/auth.js';
import express from 'express';
import { AuthenticateUser } from '../middleware/authmiddleware.js';
const router = express.Router();
router.get('/users', AuthenticateUser, getAllUsers);
router.post('/users/add', postUser);
router.get('/users/:user_id/balances', getBalancesByUser);
router.post('/users/:user_id/balances/add', postBalance);
router.post('/auth/register', registerUser);
router.post('/auth/login', login);

export default router;
