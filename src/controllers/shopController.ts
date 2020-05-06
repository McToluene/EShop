import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { Logger } from 'winston';
import ShopService from '../services/shopService';
import { IShopDto } from '../interfaces/IShop';

export const createShop = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = Container.get('logger');
  logger.debug('Calling create shop endpoint with body: %o', req.body);

  try {
    const shopServiceInstance = Container.get<ShopService>(ShopService);
    const { shop } = await shopServiceInstance.createShop(req.body as IShopDto, req.currentUser.type);

    return res.status(201).json({ shop });
  } catch (error) {
    logger.error('Error: %o', error);
    return next(error);
  }
};

export const updateShop = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = Container.get('logger');
  logger.debug('Calling update shop endpoint with body: %o', req.body);

  try {
    const shopServiceInstance = Container.get<ShopService>(ShopService);
    const { shop } = await shopServiceInstance.updateShop(req.body as IShopDto, req.currentUser.type);

    return res.status(201).json({ shop });
  } catch (error) {
    logger.error('Error: %o', error);
    return next(error);
  }
};
