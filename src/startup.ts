import mongooseLoader from './loaders/db';
import Logger from './loaders/logger';
import dependencyInjector from './loaders/dependencyInjector';
import applicationLoader from './program';
import jobsLoader from './loaders/jobs';

export default async function ({ expressApp }) {
  const mongoConnection = await mongooseLoader();
  Logger.info('DB Loaded and Connected!');

  const userModel = {
    name: 'userModel',
    model: require('./models/user').default,
  };

  const shopModel = {
    name: 'shopModel',
    model: require('./models/shop').default,
  };

  const addressModel = {
    name: 'addressModel',
    model: require('./models/address').default,
  };

  const { agenda } = await dependencyInjector({
    mongoConnection,
    models: [userModel, shopModel, addressModel],
  });

  Logger.info('Dependecy Injector loaded');

  jobsLoader({ agenda });

  applicationLoader({ app: expressApp });
  Logger.info('Express Loaded');
}
