import { Router } from 'express';
import aiRoutes from './routes/ai';
import businessRoutes from './routes/business';
import financeRoutes from './routes/finance';
import marketRoutes from './routes/market';

const apiRouter = Router();

apiRouter.use('/ai', aiRoutes);
apiRouter.use('/business', businessRoutes);
apiRouter.use('/finance', financeRoutes);
apiRouter.use('/market', marketRoutes);

export default apiRouter;
