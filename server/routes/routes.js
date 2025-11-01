import { getAllUsers, postUser } from '../controllers/user.controller.js';
import {
  getBalancesByUser,
  postBalance,
} from '../controllers/balance.controller.js';
import { registerUser, login } from '../controllers/auth.js';
import express from 'express';
import { AuthenticateUser } from '../middleware/authmiddleware.js';
const router = express.Router();
router.post('/auth/register', registerUser);
router.post('/auth/login', login);

// User Routes Protected by Authentication Middleware
router.get('/users', AuthenticateUser, getAllUsers);
router.post('/users/add', AuthenticateUser, postUser);
router.get('/users/:user_id/balances', AuthenticateUser, getBalancesByUser);
router.post('/users/:user_id/balances/add', AuthenticateUser, postBalance);

export default router;
