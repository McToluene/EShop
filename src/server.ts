import 'reflect-metadata'; // We need this in order to use @Decorators

import express from 'express';
import congig from './config';
import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  await require('./startup').default({ expressApp: app });

  app.listen(congig.port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1); // Process should exit if there's an error
      return;
    }

    Logger.info(`Server is running on http://localhost:${congig.port}`);
  });
}

startServer();
