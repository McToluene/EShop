import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import { celebrate, Joi } from 'celebrate';
import { createShop } from '../../controllers/shopController';
import attachCurrentUser from '../middlewares/attachCurrentUser';

const shopRoute: Router = Router();

// @route   POST api/shop/create
// @desc    Create shop
// @access  private
shopRoute.post(
  '/create',
  isAuth,
  attachCurrentUser,
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      registrationNumber: Joi.string().required(),
      owner: Joi.string().required(),
      // address: Joi.string().required(),
    }),
  }),
  createShop,
);

export default shopRoute;
