import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { Logger } from 'winston';

const attachCurrentUser = async (req: Request | any, res: Response, next: NextFunction) => {
  const logger: Logger = Container.get('logger');

  try {
    const userModel = Container.get('userModel') as Models.UserModel;
    const userRecord = await userModel.findById(req.token._id);

    if (!userRecord) {
      return res.sendStatus(401);
    }

    const currentUser = userRecord.toObject();
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'salt');

    req.currentUser = currentUser;
    return next();
  } catch (error) {
    logger.error('Error attaching user %o', error);
    return next(error);
  }
};
export default attachCurrentUser;
