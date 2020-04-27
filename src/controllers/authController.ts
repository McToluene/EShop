import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { Logger } from 'winston';
import AuthService from '../services/authService';
import { IUserDTO } from '../interfaces/IUser';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = Container.get('logger');
  logger.debug('Calling register endpoint with body: %o', req.body);

  try {
    const authServiceInstance = Container.get<AuthService>(AuthService);
    const { user, token } = await authServiceInstance.register(req.body as IUserDTO);

    return res.status(201).json({ user, token });
  } catch (error) {
    logger.error('Error: %o', error);
    return next(error);
  }
};

export async function login(req: Request, res: Response, next: NextFunction) {
  const logger = Container.get<Logger>('logger');
  logger.debug('Calling login endpoint with body: %o', req.body);

  try {
    const { email, password } = req.body;
    const authServiceInstance = Container.get<AuthService>(AuthService);
    const { user, token } = await authServiceInstance.login(email, password);

    return res.status(200).json({ user, token });
  } catch (error) {
    logger.error('Error: %0', error);
    return next(error);
  }
}
