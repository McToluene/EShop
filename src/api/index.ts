import authRoutes from './routes/authRoute';
import { Router } from 'express';

const routes: Router = Router();
routes.use('/auth', authRoutes);

export default routes;
