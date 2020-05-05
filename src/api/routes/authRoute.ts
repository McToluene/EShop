import { Router } from 'express';
import { register, login } from '../../controllers/authController';
import { celebrate, Joi } from 'celebrate';

const authRoute: Router = Router();

// @route   POST api/auth/register
// @desc    Create user and get token
// @access  public
authRoute.post(
  '/register',
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      type: Joi.string().required(),
    }),
  }),
  register,
);

// @route   POST api/auth/signin
// @desc    Authenticate user and get token
// @access  public
authRoute.post(
  '/login',
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

export default authRoute;
