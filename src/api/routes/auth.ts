import { Router } from 'express';
import { signUp, signIn } from '../../controllers/authController';

const authRoute: Router = Router();

authRoute.post('/signup', signUp);

authRoute.get('/signin', signIn);

export default authRoute;
