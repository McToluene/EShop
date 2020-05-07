import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import { celebrate, Joi } from 'celebrate';
import { createShop, updateShop } from '../../controllers/shopController';
import attachCurrentUser from '../middlewares/attachCurrentUser';

const shopRoute: Router = Router();

// @route   POST api/shop/create
// @desc    Create shop
// @access  private
const objectSchema = Joi.object({
  city: Joi.string().required(),
  state: Joi.string().required(),
  street: Joi.string().required(),
}).required();
shopRoute.post(
  '/create',
  isAuth,
  attachCurrentUser,
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      registrationNumber: Joi.string().required(),
      owner: Joi.string().required(),
      address: Joi.array().items(objectSchema).min(1).unique(),
    }),
  }),
  createShop,
);

// @route   POST api/shop/update
// @desc    Update shop details
// @access  private
shopRoute.post(
  '/update',
  isAuth,
  attachCurrentUser,
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      registrationNumber: Joi.string().required(),
      owner: Joi.string().required(),
      address: Joi.array().items(objectSchema).min(1).unique(),
    }),
  }),
  updateShop,
);

export default shopRoute;
