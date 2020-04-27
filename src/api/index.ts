import { Router } from 'express';
import auth from './routes/auth';

export default () => {
  const app = Router();
  app.use('/auth', auth);

  return app;
};
