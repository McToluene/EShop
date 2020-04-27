import express, { Application, NextFunction, Response, Request } from 'express';
import routes from './api';
import config from './config';
import authRoute from './api/routes/auth';

export default ({ app }: { app: Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  //Middleware that transform the raw req.body to json
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(config.api.prefix, authRoute);

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  // Error handlers
  app.use((err, req: Request, res: Response, next: NextFunction) => {
    //Handle 401 thrown by express
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
