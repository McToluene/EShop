import { Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';
import Container from 'typedi';

const attachCurrentShop = async (req: Request | any, res: Response, next: NextFunction) => {
  const logger: Logger = Container.get('logger');
  const _id = req.param('id');

  try {
    const shopModel = Container.get('shopModel') as Models.UserModel;
    const shop = await shopModel.findOne({ _id });

    if (!shop) {
      return res.sendStatus(401);
    }

    req.shop = shop;
    return next();
  } catch (error) {
    logger.error('Error attaching shop %o', error);
    return next(error);
  }
};

export default attachCurrentShop;
