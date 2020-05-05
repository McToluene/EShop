import authRoutes from './routes/authRoute';
import shopRoute from './routes/shopRoute';
import { Router } from 'express';

const routes: Router = Router();
routes.use('/auth', authRoutes);
routes.use('/shop', shopRoute);

export default routes;
