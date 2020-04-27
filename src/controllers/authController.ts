import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { Logger } from 'winston';
import AuthService from '../services/authService';
import { IUserDTO } from '../interfaces/IUser';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = Container.get('logger');
  logger.debug('Calling sign-in endpoint with body: %o', req.body);

  try {
    const authServiceInstance = Container.get<AuthService>(AuthService);
    const { user, token } = await authServiceInstance.signUp(req.body as IUserDTO);

    return res.status(201).json({ user, token });
  } catch (error) {
    logger.error('Error: %o', error);
    return next(error);
  }
};

export async function signIn(req: Request, res: Response, next: NextFunction) {
  return res.json('Hello World!');
}
