import { Router } from 'express';
import User from '../controllers/user';
import { validSignup, validSignin } from '../helpers/validations';
const router = Router();
router.post('/signup',validSignup, User.signUp);
router.post('/signin',validSignin, User.login);

export default router;